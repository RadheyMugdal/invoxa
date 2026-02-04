import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { CurrencyCode, type InvoiceData } from "@/types/invoice"
import { calculateTotals, formatCurrency } from "@/lib/invoice-utils"

interface InvoicePDFProps {
  invoice: InvoiceData
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 48,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    borderBottomStyle: "solid",
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  invoiceNumber: {
    fontSize: 10,
    color: "#6b7280",
  },
  dateSection: {
    flex: 1,
    alignItems: "flex-end",
  },
  dateRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  dateLabel: {
    color: "#6b7280",
    marginRight: 4,
  },
  dateValue: {
    fontWeight: "medium",
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#9ca3af",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  twoColumnSection: {
    flexDirection: "row",
    marginBottom: 32,
  },
  column: {
    flex: 1,
  },
  name: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: {
    fontSize: 10,
    color: "#4b5563",
    marginBottom: 2,
  },
  smallText: {
    fontSize: 8,
    color: "#6b7280",
  },
  table: {
    marginBottom: 24,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#111827",
    borderBottomStyle: "solid",
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    borderBottomStyle: "solid",
    paddingVertical: 12,
  },
  colDescription: {
    flex: 1,
  },
  colQty: {
    width: 64,
    textAlign: "right",
  },
  colRate: {
    width: 96,
    textAlign: "right",
  },
  colAmount: {
    width: 112,
    textAlign: "right",
  },
  tableHeaderCell: {
    fontSize: 10,
    fontWeight: "bold",
  },
  textRight: {
    textAlign: "right",
  },
  totalsSection: {
    alignItems: "flex-end",
    marginBottom: 32,
  },
  totalsContainer: {
    width: 320,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  totalRowBold: {
    borderTopWidth: 2,
    borderTopColor: "#111827",
    borderTopStyle: "solid",
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    color: "#4b5563",
  },
  totalValue: {
    fontWeight: "medium",
  },
  totalValueBold: {
    fontSize: 18,
    fontWeight: "bold",
  },
  notesSection: {
    marginBottom: 24,
  },
  notesText: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.6,
  },
  footer: {
    position: "absolute",
    bottom: 48,
    left: 48,
    right: 48,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    borderTopStyle: "solid",
    paddingTop: 16,
  },
  footerText: {
    fontSize: 8,
    color: "#9ca3af",
    textAlign: "center",
  },
})

export function InvoicePDF({ invoice }: InvoicePDFProps) {
  const totals = calculateTotals(invoice)
  const currency = invoice.currency as CurrencyCode

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
          </View>
          <View style={styles.dateSection}>
            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>Date:</Text>
              <Text style={styles.dateValue}>{invoice.invoiceDate}</Text>
            </View>
            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>Due:</Text>
              <Text style={styles.dateValue}>{invoice.dueDate}</Text>
            </View>
          </View>
        </View>

        {/* From / Bill To */}
        <View style={styles.twoColumnSection}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>From</Text>
            <Text style={styles.name}>{invoice.sender.name || "Your Name"}</Text>
            <Text style={styles.text}>{invoice.sender.email || "email@example.com"}</Text>
            <Text style={styles.text}>{invoice.sender.phone || "+1 234 567 890"}</Text>
            <Text style={styles.smallText}>{invoice.sender.address || "Your Address"}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Bill To</Text>
            <Text style={styles.name}>{invoice.client.name || "Client Name"}</Text>
            <Text style={styles.text}>{invoice.client.email || "client@example.com"}</Text>
            <Text style={styles.text}>{invoice.client.phone || "+1 234 567 890"}</Text>
            <Text style={styles.smallText}>{invoice.client.address || "Client Address"}</Text>
          </View>
        </View>

        {/* Line Items */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.colDescription, styles.tableHeaderCell]}>Description</Text>
            <Text style={[styles.colQty, styles.tableHeaderCell]}>Qty</Text>
            <Text style={[styles.colRate, styles.tableHeaderCell]}>Rate</Text>
            <Text style={[styles.colAmount, styles.tableHeaderCell]}>Amount</Text>
          </View>
          {invoice.lineItems.length === 0 ? (
            <View style={styles.tableRow}>
              <Text style={[styles.colDescription, { color: "#9ca3af" }]}>No items added</Text>
            </View>
          ) : (
            invoice.lineItems.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={styles.colDescription}>{item.description || "Item description"}</Text>
                <Text style={[styles.colQty, styles.textRight]}>{item.quantity}</Text>
                <Text style={[styles.colRate, styles.textRight]}>{formatCurrency(item.rate, currency)}</Text>
                <Text style={[styles.colAmount, styles.textRight, { fontWeight: "medium" }]}>
                  {formatCurrency(item.amount, currency)}
                </Text>
              </View>
            ))
          )}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalsContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>{formatCurrency(totals.subtotal, currency)}</Text>
            </View>
            {invoice.taxRate > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tax ({invoice.taxRate}%)</Text>
                <Text style={styles.totalValue}>{formatCurrency(totals.taxAmount, currency)}</Text>
              </View>
            )}
            {invoice.discount.value > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>
                  Discount ({invoice.discount.type === "percentage" ? `${invoice.discount.value}%` : formatCurrency(invoice.discount.value, currency)})
                </Text>
                <Text style={styles.totalValue}>-{formatCurrency(totals.discountAmount, currency)}</Text>
              </View>
            )}
            <View style={[styles.totalRow, styles.totalRowBold]}>
              <Text style={[styles.totalLabel, { fontWeight: "bold" }]}>Total Due</Text>
              <Text style={[styles.totalValue, styles.totalValueBold]}>{formatCurrency(totals.total, currency)}</Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        {invoice.notes && (
          <View style={styles.notesSection}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        )}

        {/* Payment Instructions */}
        {invoice.paymentInstructions && (
          <View style={styles.notesSection}>
            <Text style={styles.sectionTitle}>Payment Instructions</Text>
            <Text style={styles.notesText}>{invoice.paymentInstructions}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Thank you for your business</Text>
        </View>
      </Page>
    </Document>
  )
}
