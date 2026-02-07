import { z } from "zod";
import { eq, and, desc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { randomBytes } from "crypto";
import db from "@/db";
import { invoice, invoiceShare, lineItem } from "@/db/schema";
import { protectedProcedure, publicProcedure, createTRPCRouter } from "../trpc";

export const invoiceShareRouter = createTRPCRouter({
  // Create share link
  create: protectedProcedure
    .input(z.object({ invoiceId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Verify invoice ownership
      const [existingInvoice] = await db
        .select()
        .from(invoice)
        .where(
          and(
            eq(invoice.id, input.invoiceId),
            eq(invoice.userId, ctx.user.id)
          )
        );

      if (!existingInvoice) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invoice not found or access denied",
        });
      }

      // Generate secure token
      const shareToken = randomBytes(32).toString("base64url");

      // Create share
      const [newShare] = await db
        .insert(invoiceShare)
        .values({
          invoiceId: input.invoiceId,
          shareToken,
          createdBy: ctx.user.id,
        })
        .returning();

      // Generate share URL
      const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/share/${shareToken}`;

      return { share: newShare, shareUrl };
    }),

  // List shares for an invoice
  getByInvoice: protectedProcedure
    .input(z.object({ invoiceId: z.string() }))
    .query(async ({ ctx, input }) => {
      // Verify ownership
      const [existingInvoice] = await db
        .select()
        .from(invoice)
        .where(
          and(
            eq(invoice.id, input.invoiceId),
            eq(invoice.userId, ctx.user.id)
          )
        );

      if (!existingInvoice) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invoice not found",
        });
      }

      const shares = await db
        .select()
        .from(invoiceShare)
        .where(eq(invoiceShare.invoiceId, input.invoiceId))
        .orderBy(desc(invoiceShare.createdAt));

      return shares;
    }),

  // Revoke share (set isActive to false)
  revoke: protectedProcedure
    .input(z.object({ shareId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const [existingShare] = await db
        .select()
        .from(invoiceShare)
        .where(
          and(
            eq(invoiceShare.id, input.shareId),
            eq(invoiceShare.createdBy, ctx.user.id)
          )
        );

      if (!existingShare) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Share not found",
        });
      }

      await db
        .update(invoiceShare)
        .set({ isActive: false })
        .where(eq(invoiceShare.id, input.shareId));

      return { success: true };
    }),

  // Delete share permanently
  delete: protectedProcedure
    .input(z.object({ shareId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const [existingShare] = await db
        .select()
        .from(invoiceShare)
        .where(
          and(
            eq(invoiceShare.id, input.shareId),
            eq(invoiceShare.createdBy, ctx.user.id)
          )
        );

      if (!existingShare) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Share not found",
        });
      }

      await db.delete(invoiceShare).where(eq(invoiceShare.id, input.shareId));

      return { success: true };
    }),

  // Public: Get shared invoice via token
  getByToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      // Find valid share
      const [share] = await db
        .select()
        .from(invoiceShare)
        .where(
          and(
            eq(invoiceShare.shareToken, input.token),
            eq(invoiceShare.isActive, true)
          )
        );

      if (!share) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Share link not found or has been revoked",
        });
      }

      // Get invoice with line items
      const [invoiceData] = await db
        .select()
        .from(invoice)
        .where(eq(invoice.id, share.invoiceId));

      if (!invoiceData) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invoice not found",
        });
      }

      const lineItems = await db
        .select()
        .from(lineItem)
        .where(eq(lineItem.invoiceId, share.invoiceId));

      // Update view count and last viewed
      await db
        .update(invoiceShare)
        .set({
          viewCount: share.viewCount + 1,
          lastViewedAt: new Date(),
        })
        .where(eq(invoiceShare.id, share.id));

      return {
        invoice: { ...invoiceData, lineItems },
      };
    }),
});
