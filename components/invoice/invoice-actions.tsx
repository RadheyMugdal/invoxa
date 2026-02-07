"use client";

import { Button } from "@/components/ui/button";
import {
  IconDownload,
  IconPrinter,
  IconRefresh,
  IconDeviceFloppy,
} from "@tabler/icons-react";
import { downloadAsPDF, printInvoice } from "@/lib/pdf-generator";
import { toast } from "sonner";
import { type InvoiceData } from "@/types/invoice";

interface InvoiceActionsProps {
  invoice: InvoiceData;
  onReset?: () => void;
  onSave?: () => void;
  isSaving?: boolean;
  editMode?: boolean;
}

export function InvoiceActions({
  invoice,
  onReset,
  onSave,
  isSaving = false,
  editMode = false,
}: InvoiceActionsProps) {
  const handleDownloadPDF = async () => {
    try {
      const filename = `${invoice.invoiceNumber.replace(/\s+/g, "-")}.pdf`;
      await downloadAsPDF(invoice, filename);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("Failed to download PDF. Please try again.");
    }
  };

  const handlePrint = () => {
    try {
      printInvoice(invoice);
      toast.success("Opening print dialog...");
    } catch (error) {
      console.error("Error printing:", error);
      toast.error("Failed to print. Please try again.");
    }
  };

  return (
    <div className="flex items-center gap-2">
       {onReset && (
        <Button variant="outline" size={"icon"} onClick={onReset} data-icon="inline-start">
          <IconRefresh />
        </Button>
      )}
      <Button variant="outline" size={"icon"} onClick={handlePrint} data-icon="inline-start">
        <IconPrinter /> 
      </Button>
      <Button onClick={handleDownloadPDF} data-icon="inline-start">
        <IconDownload /> Download PDF
      </Button>
      {onSave && (
        <Button
          variant="default"
          onClick={onSave}
          disabled={isSaving}
          data-icon="inline-start"
        >
          <IconDeviceFloppy />
          {isSaving
            ? "Saving..."
            : editMode
              ? "Update Invoice"
              : "Save Invoice"}
        </Button>
      )}
     
    </div>
  );
}
