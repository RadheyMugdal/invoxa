"use client"

import { useState, useMemo } from "react"
import { type InvoiceData } from "@/types/invoice"
import { InvoiceForm } from "./invoice-form"
import { InvoicePreview } from "./invoice-preview"
import { InvoiceActions } from "./invoice-actions"
import {
  generateInvoiceNumber,
  getTodayDate,
  getDefaultDueDate,
  calculateTotals,
} from "@/lib/invoice-utils"
import { IconFileInvoiceFilled } from "@tabler/icons-react"

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
}

export function InvoiceGenerator() {
  const [invoice, setInvoice] = useState<InvoiceData>(initialInvoiceData)

  const totals = useMemo(() => calculateTotals(invoice), [invoice])

  const handleReset = () => {
    setInvoice({
      ...initialInvoiceData,
      invoiceNumber: generateInvoiceNumber(),
      invoiceDate: getTodayDate(),
      dueDate: getDefaultDueDate(),
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Actions */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto  py-4 flex items-center justify-between">
          <div className=" flex justify-between  w-full">
            <div className=" flex items-center gap-1">
              <IconFileInvoiceFilled size={24} />
              <h1 className=" font-semibold text-xl">Create new invoice</h1>
            </div>
            <InvoiceActions invoice={invoice} onReset={handleReset} />
          </div>
        </div>
      </header>
      <main className="grid grid-cols-2 gap-4 pt-4 h-[calc(100vh-73px)]">
        <div className=" w-full h-full overflow-scroll">
          <InvoiceForm invoice={invoice} onChange={setInvoice} />
        </div>
        <InvoicePreview invoice={invoice} />
      </main>

      {/* Main Content - Split Layout */}


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
  )
}
