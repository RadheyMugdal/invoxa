import type { CurrencyCode, CURRENCY_SYMBOLS } from "@/types/invoice"

export const CURRENCY_OPTIONS: { value: CurrencyCode; label: string }[] = [
  { value: "USD", label: "USD - US Dollar ($)" },
  { value: "EUR", label: "EUR - Euro (€)" },
  { value: "GBP", label: "GBP - British Pound (£)" },
  { value: "INR", label: "INR - Indian Rupee (₹)" },
  { value: "JPY", label: "JPY - Japanese Yen (¥)" },
  { value: "CAD", label: "CAD - Canadian Dollar (C$)" },
  { value: "AUD", label: "AUD - Australian Dollar (A$)" },
  { value: "CHF", label: "CHF - Swiss Franc (CHF)" },
  { value: "CNY", label: "CNY - Chinese Yuan (¥)" },
  { value: "SGD", label: "SGD - Singapore Dollar (S$)" },
  { value: "HKD", label: "HKD - Hong Kong Dollar (HK$)" },
  { value: "NZD", label: "NZD - New Zealand Dollar (NZ$)" },
  { value: "SEK", label: "SEK - Swedish Krona (kr)" },
  { value: "NOK", label: "NOK - Norwegian Krone (kr)" },
  { value: "DKK", label: "DKK - Danish Krone (kr)" },
  { value: "MXN", label: "MXN - Mexican Peso ($)" },
  { value: "BRL", label: "BRL - Brazilian Real (R$)" },
  { value: "KRW", label: "KRW - South Korean Won (₩)" },
  { value: "ZAR", label: "ZAR - South African Rand (R)" },
  { value: "AED", label: "AED - UAE Dirham (د.إ)" },
]
