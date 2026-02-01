"use client"

import { Button } from "@/components/ui/button"
import { IconDownload, IconPrinter, IconRefresh } from "@tabler/icons-react"
import { downloadAsPDF, printInvoice } from "@/lib/pdf-generator"
import { toast } from "sonner"
import { type InvoiceData } from "@/types/invoice"

interface InvoiceActionsProps {
  invoice: InvoiceData
  onReset?: () => void
}

export function InvoiceActions({ invoice, onReset }: InvoiceActionsProps) {
  const handleDownloadPDF = async () => {
    try {
      const filename = `${invoice.invoiceNumber.replace(/\s+/g, "-")}.pdf`
      await downloadAsPDF(invoice, filename)
      toast.success("PDF downloaded successfully!")
    } catch (error) {
      console.error("Error downloading PDF:", error)
      toast.error("Failed to download PDF. Please try again.")
    }
  }

  const handlePrint = () => {
    try {
      printInvoice(invoice)
      toast.success("Opening print dialog...")
    } catch (error) {
      console.error("Error printing:", error)
      toast.error("Failed to print. Please try again.")
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={handlePrint} data-icon="inline-start">
        <IconPrinter /> Print
      </Button>
      <Button onClick={handleDownloadPDF} data-icon="inline-start">
        <IconDownload /> Download PDF
      </Button>
      {onReset && (
        <Button variant="ghost" onClick={onReset} data-icon="inline-start">
          <IconRefresh /> Reset
        </Button>
      )}
    </div>
  )
}
