"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { type InvoiceData } from "@/types/invoice";
import { InvoiceForm } from "./invoice-form";
import { InvoicePreview } from "./invoice-preview";
import { InvoiceActions } from "./invoice-actions";
import {
  generateInvoiceNumber,
  getTodayDate,
  getDefaultDueDate,
  calculateTotals,
} from "@/lib/invoice-utils";
import { IconFileInvoiceFilled } from "@tabler/icons-react";

import { toast } from "sonner";
import { api } from "@/trpc/react";

const initialInvoiceData: InvoiceData = {
  invoiceNumber: generateInvoiceNumber(),
  invoiceDate: getTodayDate(),
  dueDate: getDefaultDueDate(),
  currency: "USD",
  sender: {
    name: "",
    email: "",
    phone: "",
    address: "",
  },
  client: {
    name: "",
    email: "",
    phone: "",
    address: "",
  },
  lineItems: [],
  taxRate: 0,
  discount: {
    type: "percentage",
    value: 0,
  },
  notes: "",
  paymentInstructions: "",
};

interface InvoiceGeneratorProps {
  editMode?: boolean;
}

export function InvoiceGenerator({ editMode = false }: InvoiceGeneratorProps) {
  const router = useRouter();
  const params = useParams();
  const invoiceId = params.id as string | undefined;

  const [invoice, setInvoice] = useState<InvoiceData>(initialInvoiceData);
  const [invoiceName, setInvoiceName] = useState("Untitled Invoice");
  const [isSaving, setIsSaving] = useState(false);

  const createInvoice = api.invoice.create.useMutation();
  const updateInvoice = api.invoice.update.useMutation();

  // Load invoice data if in edit mode
  const { data: existingInvoice, isLoading } = api.invoice.getById.useQuery(
    { id: invoiceId! },
    { enabled: editMode && !!invoiceId }
  );

  useEffect(() => {
    if (existingInvoice && editMode) {
      const { lineItems, ...invoiceData } = existingInvoice;
      setInvoice({
        invoiceNumber: invoiceData.invoiceNumber,
        invoiceDate: new Date(invoiceData.invoiceDate)
          .toISOString()
          .split("T")[0],
        dueDate: new Date(invoiceData.dueDate).toISOString().split("T")[0],
        currency: invoiceData.currency,
        sender: {
          name: invoiceData.senderName,
          email: invoiceData.senderEmail,
          phone: invoiceData.senderPhone,
          address: invoiceData.senderAddress,
        },
        client: {
          name: invoiceData.clientName,
          email: invoiceData.clientEmail,
          phone: invoiceData.clientPhone,
          address: invoiceData.clientAddress,
        },
        lineItems: lineItems.map((item) => ({
          id: item.id,
          description: item.description,
          quantity: parseFloat(item.quantity),
          rate: parseFloat(item.rate),
          amount: parseFloat(item.amount),
        })),
        taxRate: parseFloat(invoiceData.taxRate),
        discount: {
          type: invoiceData.discountType as "percentage" | "fixed",
          value: parseFloat(invoiceData.discountValue),
        },
        notes: invoiceData.notes || "",
        paymentInstructions: invoiceData.paymentInstructions || "",
      });
      setInvoiceName(invoiceData.invoiceName);
    }
  }, [existingInvoice, editMode]);

  const totals = useMemo(() => calculateTotals(invoice), [invoice]);

  const handleSave = async () => {
    if (!invoiceName.trim()) {
      toast.error("Please enter an invoice name");
      return;
    }

    setIsSaving(true);

    try {
      if (editMode && invoiceId) {
        await updateInvoice.mutateAsync({
          id: invoiceId,
          invoiceName,
          ...invoice,
          subtotal: totals.subtotal,
          taxAmount: totals.taxAmount,
          discountAmount: totals.discountAmount,
          total: totals.total,
        });
        toast.success("Invoice updated successfully!");
      } else {
        const result = await createInvoice.mutateAsync({
          invoiceName,
          ...invoice,
          subtotal: totals.subtotal,
          taxAmount: totals.taxAmount,
          discountAmount: totals.discountAmount,
          total: totals.total,
        });
        toast.success("Invoice saved successfully!");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Failed to save invoice. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (editMode && existingInvoice) {
      // Reset to existing invoice data
      const { lineItems, ...invoiceData } = existingInvoice;
      setInvoice({
        invoiceNumber: invoiceData.invoiceNumber,
        invoiceDate: new Date(invoiceData.invoiceDate)
          .toISOString()
          .split("T")[0],
        dueDate: new Date(invoiceData.dueDate).toISOString().split("T")[0],
        currency: invoiceData.currency,
        sender: {
          name: invoiceData.senderName,
          email: invoiceData.senderEmail,
          phone: invoiceData.senderPhone,
          address: invoiceData.senderAddress,
        },
        client: {
          name: invoiceData.clientName,
          email: invoiceData.clientEmail,
          phone: invoiceData.clientPhone,
          address: invoiceData.clientAddress,
        },
        lineItems: lineItems.map((item) => ({
          id: item.id,
          description: item.description,
          quantity: parseFloat(item.quantity),
          rate: parseFloat(item.rate),
          amount: parseFloat(item.amount),
        })),
        taxRate: parseFloat(invoiceData.taxRate),
        discount: {
          type: invoiceData.discountType as "percentage" | "fixed",
          value: parseFloat(invoiceData.discountValue),
        },
        notes: invoiceData.notes || "",
        paymentInstructions: invoiceData.paymentInstructions || "",
      });
      setInvoiceName(invoiceData.invoiceName);
    } else {
      setInvoice({
        ...initialInvoiceData,
        invoiceNumber: generateInvoiceNumber(),
        invoiceDate: getTodayDate(),
        dueDate: getDefaultDueDate(),
      });
      setInvoiceName("Untitled Invoice");
    }
  };

  if (editMode && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading invoice...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto py-4 flex items-center justify-between">
          <div className="flex justify-between w-full">
            <div className="flex items-center ">
              <IconFileInvoiceFilled size={24} />
              <div>
                <input
                  type="text"
                  value={invoiceName}
                  onChange={(e) => setInvoiceName(e.target.value)}
                  className="font-semibold text-xl bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
                  placeholder="Invoice Name"
                />
              </div>
            </div>
            <InvoiceActions
              invoice={invoice}
              onReset={handleReset}
              onSave={handleSave}
              isSaving={isSaving}
              editMode={editMode}
            />
          </div>
        </div>
      </header>
      <main className="grid grid-cols-2 gap-4 pt-4 h-[calc(100vh-73px)]">
        <div className="w-full h-full overflow-scroll">
          <InvoiceForm invoice={invoice} onChange={setInvoice} />
        </div>
        <InvoicePreview invoice={invoice} />
      </main>

      {/* Totals Summary (Mobile Only) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background p-4 z-50">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-lg font-bold">
            {totals.total.toFixed(2)} {invoice.currency}
          </span>
        </div>
      </div>
    </div>
  );
}
