"use client";

import { Button } from "@/components/ui/button";
import { IconDownload, IconPrinter } from "@tabler/icons-react";
import { downloadAsPDF } from "@/lib/pdf-generator";
import type { InvoiceData } from "@/types/invoice";

interface SharePageActionsProps {
  invoice: InvoiceData;
}

export function SharePageActions({ invoice }: SharePageActionsProps) {
  return (
    <div className="flex gap-2">
      <Button
        onClick={() => window.print()}
        variant="outline"
        data-icon="inline-start"
      >
        <IconPrinter /> Print
      </Button>
      <Button
        onClick={() => downloadAsPDF(invoice, `${invoice.invoiceNumber}.pdf`)}
        data-icon="inline-start"
      >
        <IconDownload /> Download PDF
      </Button>
    </div>
  );
}
