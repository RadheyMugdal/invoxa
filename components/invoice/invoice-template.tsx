import { CurrencyCode, type InvoiceData } from "@/types/invoice"
import { calculateTotals, formatCurrency, formatDate } from "@/lib/invoice-utils"

interface InvoiceTemplateProps {
  invoice: InvoiceData
}

export function InvoiceTemplate({ invoice }: InvoiceTemplateProps) {
  const totals = calculateTotals(invoice)
  const currency = invoice.currency as CurrencyCode

  return (
    <div
      id="invoice-template"
      className="relative bg-white text-gray-900 mx-auto p-12 shadow-lg"
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        width: '210mm',
        minHeight: '297mm'
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">INVOICE</h1>
          <p className="text-sm text-gray-500">{invoice.invoiceNumber}</p>
        </div>
        <div className="text-right text-sm space-y-1">
          <div><span className="text-gray-500">Date:</span> <span className="font-medium">{formatDate(invoice.invoiceDate)}</span></div>
          <div><span className="text-gray-500">Due:</span> <span className="font-medium">{formatDate(invoice.dueDate)}</span></div>
        </div>
      </div>

      {/* From / Bill To */}
      <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase mb-2">From</h2>
          <p className="font-semibold text-gray-900">{invoice.sender.name || "Your Name"}</p>
          <p className="text-gray-600">{invoice.sender.email || "email@example.com"}</p>
          <p className="text-gray-600">{invoice.sender.phone || "+1 234 567 890"}</p>
          <p className="text-gray-500 whitespace-pre-line text-xs mt-1">{invoice.sender.address || "Your Address"}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase mb-2">Bill To</h2>
          <p className="font-semibold text-gray-900">{invoice.client.name || "Client Name"}</p>
          <p className="text-gray-600">{invoice.client.email || "client@example.com"}</p>
          <p className="text-gray-600">{invoice.client.phone || "+1 234 567 890"}</p>
          <p className="text-gray-500 whitespace-pre-line text-xs mt-1">{invoice.client.address || "Client Address"}</p>
        </div>
      </div>

      {/* Line Items */}
      <table className="w-full mb-6 text-sm">
        <thead>
          <tr className="border-b-2 border-gray-900">
            <th className="text-left py-2 font-semibold text-gray-900">Description</th>
            <th className="text-right py-2 font-semibold text-gray-900 w-16">Qty</th>
            <th className="text-right py-2 font-semibold text-gray-900 w-24">Rate</th>
            <th className="text-right py-2 font-semibold text-gray-900 w-28">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.lineItems.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-8 text-center text-gray-400 text-xs">
                No items added
              </td>
            </tr>
          ) : (
            invoice.lineItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-3 text-gray-900">{item.description || "Item description"}</td>
                <td className="py-3 text-gray-600 text-right">{item.quantity}</td>
                <td className="py-3 text-gray-600 text-right">{formatCurrency(item.rate, currency)}</td>
                <td className="py-3 text-gray-900 text-right font-medium">{formatCurrency(item.amount, currency)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-80 space-y-2 text-sm">
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatCurrency(totals.subtotal, currency)}</span>
          </div>

          {invoice.taxRate > 0 && (
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tax ({invoice.taxRate}%)</span>
              <span className="font-medium">{formatCurrency(totals.taxAmount, currency)}</span>
            </div>
          )}

          {invoice.discount.value > 0 && (
            <div className="flex justify-between py-2">
              <span className="text-gray-600">
                Discount ({invoice.discount.type === "percentage" ? `${invoice.discount.value}%` : formatCurrency(invoice.discount.value, currency)})
              </span>
              <span className="font-medium">-{formatCurrency(totals.discountAmount, currency)}</span>
            </div>
          )}

          <div className="flex justify-between py-3 border-t-2 border-gray-900 mt-2">
            <span className="font-bold text-gray-900">Total Due</span>
            <span className="font-bold text-lg">{formatCurrency(totals.total, currency)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className="mb-6 text-sm">
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Notes</h3>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{invoice.notes}</p>
        </div>
      )}

      {/* Payment Instructions */}
      {invoice.paymentInstructions && (
        <div className="mb-6 text-sm">
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Payment Instructions</h3>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{invoice.paymentInstructions}</p>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-12 left-12 right-12 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center">Thank you for your business</p>
      </div>
    </div>
  )
}