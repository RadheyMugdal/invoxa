import { z } from "zod";
import { eq, and, desc, or, ilike, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import db from "@/db";
import { invoice, lineItem } from "@/db/schema";
import { protectedProcedure, createTRPCRouter } from "../trpc";

// Zod schemas for validation
const senderSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
});

const clientSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
});

const lineItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  quantity: z.number(),
  rate: z.number(),
  amount: z.number(),
});

const discountSchema = z.object({
  type: z.enum(["percentage", "fixed"]),
  value: z.number(),
});

const createInvoiceSchema = z.object({
  invoiceName: z.string().min(1, "Invoice name is required"),
  invoiceNumber: z.string().min(1),
  invoiceDate: z.string(),
  dueDate: z.string(),
  currency: z.string(),
  sender: senderSchema,
  client: clientSchema,
  lineItems: z.array(lineItemSchema),
  taxRate: z.number(),
  discount: discountSchema,
  notes: z.string(),
  paymentInstructions: z.string(),
  subtotal: z.number(),
  taxAmount: z.number(),
  discountAmount: z.number(),
  total: z.number(),
});

export const invoiceRouter = createTRPCRouter({
  // Get all invoices for the current user with pagination, search, and filtering
  getAll: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        pageSize: z.number().min(1).max(100).default(10),
        search: z.string().optional(),
        status: z.enum(["all", "paid", "pending", "overdue"]).default("all"),
        sortBy: z.enum(["createdAt", "invoiceDate", "invoiceName", "total"]).default("createdAt"),
        sortOrder: z.enum(["asc", "desc"]).default("desc"),
      }).optional()
    )
    .query(async ({ ctx, input }) => {
      const {
        page = 1,
        pageSize = 10,
        search = "",
        status = "all",
        sortBy = "createdAt",
        sortOrder = "desc",
      } = input || {};

      // Build where conditions
      const conditions = [eq(invoice.userId, ctx.user.id)];

      // Add search condition
      if (search && search.trim() !== "") {
        const searchCondition = ilike(invoice.invoiceName, `%${search}%`);
        conditions.push(searchCondition);
      }

      // Calculate offset
      const offset = (page - 1) * pageSize;

      // Get total count
      const [{ count }] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(invoice)
        .where(and(...conditions));

      // Get invoices with pagination and sorting
      const invoices = await db
        .select()
        .from(invoice)
        .where(and(...conditions))
        .orderBy(
          sortOrder === "desc"
            ? desc(invoice[sortBy as keyof typeof invoice] as any)
            : sql`${invoice[sortBy as keyof typeof invoice]} ASC`
        )
        .limit(pageSize)
        .offset(offset);

      return {
        invoices,
        pagination: {
          page,
          pageSize,
          totalCount: count,
          totalPages: Math.ceil(count / pageSize),
        },
      };
    }),

  // Get a single invoice by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [invoiceData] = await db
        .select()
        .from(invoice)
        .where(
          and(
            eq(invoice.id, input.id),
            eq(invoice.userId, ctx.user.id)
          )
        );

      if (!invoiceData) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invoice not found",
        });
      }

      // Get line items for this invoice
      const lineItems = await db
        .select()
        .from(lineItem)
        .where(eq(lineItem.invoiceId, input.id));

      return {
        ...invoiceData,
        lineItems,
      };
    }),

  // Create a new invoice
  create: protectedProcedure
    .input(createInvoiceSchema)
    .mutation(async ({ ctx, input }) => {

      // Create invoice
      const [newInvoice] = await db
        .insert(invoice)
        .values({
  
          userId: ctx.user.id,
          invoiceName: input.invoiceName,
          invoiceNumber: input.invoiceNumber,
          invoiceDate: new Date(input.invoiceDate),
          dueDate: new Date(input.dueDate),
          currency: input.currency,
          senderName: input.sender.name,
          senderEmail: input.sender.email,
          senderPhone: input.sender.phone,
          senderAddress: input.sender.address,
          clientName: input.client.name,
          clientEmail: input.client.email,
          clientPhone: input.client.phone,
          clientAddress: input.client.address,
          taxRate: input.taxRate.toString(),
          discountType: input.discount.type,
          discountValue: input.discount.value.toString(),
          subtotal: input.subtotal.toString(),
          taxAmount: input.taxAmount.toString(),
          discountAmount: input.discountAmount.toString(),
          total: input.total.toString(),
          notes: input.notes,
          paymentInstructions: input.paymentInstructions,
        })
        .returning();
        console.log(newInvoice,"Invoice created successfully")
      // Create line items
      if (input.lineItems.length > 0) {
        await db.insert(lineItem).values(
          input.lineItems.map((item) => ({
            invoiceId:newInvoice.id,
            description: item.description,
            quantity: item.quantity.toString(),
            rate: item.rate.toString(),
            amount: item.amount.toString(),
          }))
        );
        console.log("line items created successfully");
        
      }

      return newInvoice;
    }),

  // Update an existing invoice
  update: protectedProcedure
    .input(
      createInvoiceSchema.extend({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, lineItems, ...invoiceData } = input;

      // Verify ownership
      const [existing] = await db
        .select()
        .from(invoice)
        .where(
          and(eq(invoice.id, id), eq(invoice.userId, ctx.user.id))
        );

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invoice not found",
        });
      }

      // Update invoice
      await db
        .update(invoice)
        .set({
          invoiceName: invoiceData.invoiceName,
          invoiceNumber: invoiceData.invoiceNumber,
          invoiceDate: new Date(invoiceData.invoiceDate),
          dueDate: new Date(invoiceData.dueDate),
          currency: invoiceData.currency,
          senderName: invoiceData.sender.name,
          senderEmail: invoiceData.sender.email,
          senderPhone: invoiceData.sender.phone,
          senderAddress: invoiceData.sender.address,
          clientName: invoiceData.client.name,
          clientEmail: invoiceData.client.email,
          clientPhone: invoiceData.client.phone,
          clientAddress: invoiceData.client.address,
          taxRate: invoiceData.taxRate.toString(),
          discountType: invoiceData.discount.type,
          discountValue: invoiceData.discount.value.toString(),
          subtotal: invoiceData.subtotal.toString(),
          taxAmount: invoiceData.taxAmount.toString(),
          discountAmount: invoiceData.discountAmount.toString(),
          total: invoiceData.total.toString(),
          notes: invoiceData.notes,
          paymentInstructions: invoiceData.paymentInstructions,
        })
        .where(eq(invoice.id, id));

      // Delete existing line items
      await db.delete(lineItem).where(eq(lineItem.invoiceId, id));

      // Insert new line items
      if (lineItems.length > 0) {
        await db.insert(lineItem).values(
          lineItems.map((item) => ({
            invoiceId: id,
            description: item.description,
            quantity: item.quantity.toString(),
            rate: item.rate.toString(),
            amount: item.amount.toString(),
          }))
        );
      }

      return { success: true };
    }),

  // Delete an invoice
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Verify ownership (cascade will delete line items)
      const [existing] = await db
        .select()
        .from(invoice)
        .where(
          and(eq(invoice.id, input.id), eq(invoice.userId, ctx.user.id))
        );

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invoice not found",
        });
      }

      await db.delete(invoice).where(eq(invoice.id, input.id));

      return { success: true };
    }),
});
