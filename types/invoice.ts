export interface InvoiceData {
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  currency: string
  sender: SenderInfo
  client: ClientInfo
  lineItems: LineItem[]
  taxRate: number
  discount: Discount
  notes: string
  paymentInstructions: string
}

export interface SenderInfo {
  name: string
  email: string
  phone: string
  address: string
}

export interface ClientInfo {
  name: string
  email: string
  phone: string
  address: string
}

export interface LineItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

export interface Discount {
  type: "percentage" | "fixed"
  value: number
}

export interface InvoiceTotals {
  subtotal: number
  taxAmount: number
  discountAmount: number
  total: number
}

export type CurrencyCode =
  | "USD"
  | "EUR"
  | "GBP"
  | "INR"
  | "JPY"
  | "CAD"
  | "AUD"
  | "CHF"
  | "CNY"
  | "SGD"
  | "HKD"
  | "NZD"
  | "SEK"
  | "NOK"
  | "DKK"
  | "MXN"
  | "BRL"
  | "KRW"
  | "ZAR"
  | "AED"

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
  CHF: "CHF",
  CNY: "¥",
  SGD: "S$",
  HKD: "HK$",
  NZD: "NZ$",
  SEK: "kr",
  NOK: "kr",
  DKK: "kr",
  MXN: "$",
  BRL: "R$",
  KRW: "₩",
  ZAR: "R",
  AED: "د.إ",
}
