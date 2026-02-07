import { notFound } from "next/navigation";
import { InvoiceTemplate } from "@/components/invoice/invoice-template";
import { SharePageActions } from "./share-page-actions";
import { api } from "@/trpc/server";

interface SharePageProps {
  params: { token: string };
}

export default async function SharePage({ params }: SharePageProps) {
  const { token } = await params;
  let invoiceData;

  try {
    const data = await api.invoiceShare.getByToken({
      token,
    });
    invoiceData = data.invoice;
  } catch (error) {
    notFound();
  }

  const invoice = {
    invoiceNumber: invoiceData.invoiceNumber,
    invoiceName: invoiceData.invoiceName,
    invoiceDate: new Date(invoiceData.invoiceDate).toISOString().split("T")[0],
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
    lineItems: invoiceData.lineItems.map((item) => ({
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
    subtotal: parseFloat(invoiceData.subtotal),
    taxAmount: parseFloat(invoiceData.taxAmount),
    discountAmount: parseFloat(invoiceData.discountAmount),
    total: parseFloat(invoiceData.total),
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Shared Invoice - {invoice.invoiceNumber}
          </p>
          <SharePageActions invoice={invoice} />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <InvoiceTemplate invoice={invoice} />
        </div>
      </main>
    </div>
  );
}
