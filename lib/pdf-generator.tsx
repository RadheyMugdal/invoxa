/**
 * PDF & Print utilities for invoices
 * Uses @react-pdf/renderer
 */

"use client"

import { pdf } from "@react-pdf/renderer"
import type { InvoiceData } from "@/types/invoice"

/**
 * Download an invoice as PDF using @react-pdf/renderer
 */
export async function downloadAsPDF(
   invoice: InvoiceData,
   filename = "invoice.pdf",
): Promise<void> {
   if (typeof window === "undefined") return;

   try {
      // Dynamically import the InvoicePDF component
      const { InvoicePDF } = await import("@/components/invoice/invoice-pdf")

      // Generate PDF
      const doc = <InvoicePDF invoice={invoice} />
      const blob = await pdf(doc).toBlob()

      // Download the blob
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      link.click()

      // Clean up
      URL.revokeObjectURL(url)
   } catch (err) {
      console.error("PDF generation failed:", err)
      throw err
   }
}

/**
 * Open invoice in print preview
 */
export function printInvoice(invoice: InvoiceData): void {
   if (typeof window === "undefined") return;

   // For now, use the same PDF download approach
   // In a real implementation, you might want to open a print dialog
   downloadAsPDF(invoice, "invoice.pdf")
}
