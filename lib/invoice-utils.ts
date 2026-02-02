import { type InvoiceData, type InvoiceTotals, type CurrencyCode, CURRENCY_SYMBOLS } from "@/types/invoice"

/**
 * Calculate totals from invoice data
 */
export function calculateTotals(invoice: InvoiceData): InvoiceTotals {
  // Calculate subtotal from line items
  const subtotal = invoice.lineItems.reduce((sum, item) => sum + item.amount, 0)

  // Calculate tax amount
  const taxAmount = subtotal * (invoice.taxRate / 100)

  // Calculate discount amount
  let discountAmount = 0
  if (invoice.discount.type === "percentage") {
    discountAmount = subtotal * (invoice.discount.value / 100)
  } else {
    discountAmount = invoice.discount.value
  }

  // Calculate total
  const total = subtotal + taxAmount - discountAmount

  return {
    subtotal,
    taxAmount,
    discountAmount,
    total,
  }
}

/**
 * Generate invoice number (INV-timestamp)
 */
export function generateInvoiceNumber(): string {
  const timestamp = Date.now().toString().slice(-8)
  return `INV-${timestamp}`
}

/**
 * Format currency with symbol
 */
export function formatCurrency(amount: number, currency: CurrencyCode): string {
  const symbol = CURRENCY_SYMBOLS[currency] || currency
  const formattedAmount = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount))

  const sign = amount < 0 ? "-" : ""
  return `${sign}${symbol}${formattedAmount}`
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(dateObj)
  } catch {
    return ""
  }
}

/**
 * Generate a unique ID for line items
 */
export function generateLineItemId(): string {
  return `line-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Calculate line item amount
 */
export function calculateLineItemAmount(quantity: number, rate: number): number {
  return quantity * rate
}

/**
 * Get today's date in ISO format
 */
export function getTodayDate(): string {
  return new Date().toISOString().split("T")[0]
}

/**
 * Get default due date (30 days from today)
 */
export function getDefaultDueDate(): string {
  const date = new Date()
  date.setDate(date.getDate() + 30)
  return date.toISOString().split("T")[0]
}
