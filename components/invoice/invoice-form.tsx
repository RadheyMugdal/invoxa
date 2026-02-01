"use client"

import {
  type InvoiceData,
  type Discount,
  type SenderInfo,
  type ClientInfo,
  type CurrencyCode,
} from "@/types/invoice"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { LineItemsEditor } from "./line-items-editor"
import { CURRENCY_OPTIONS } from "@/lib/currency-options"
import { IconHash, IconUser, IconBuilding, IconList, IconCalculator, IconFileText } from "@tabler/icons-react"

interface InvoiceFormProps {
  invoice: InvoiceData
  onChange: (invoice: InvoiceData) => void
}

export function InvoiceForm({ invoice, onChange }: InvoiceFormProps) {
  const updateField = <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => {
    onChange({ ...invoice, [field]: value })
  }

  const updateSender = <K extends keyof SenderInfo>(field: K, value: SenderInfo[K]) => {
    onChange({ ...invoice, sender: { ...invoice.sender, [field]: value } })
  }

  const updateClient = <K extends keyof ClientInfo>(field: K, value: ClientInfo[K]) => {
    onChange({ ...invoice, client: { ...invoice.client, [field]: value } })
  }

  const updateDiscount = <K extends keyof Discount>(field: K, value: Discount[K]) => {
    onChange({ ...invoice, discount: { ...invoice.discount, [field]: value } })
  }

  return (
    <Accordion type="multiple" defaultValue={["item-invoice-details", "item-sender"]}>
      {/* Invoice Details */}
      <AccordionItem value="item-invoice-details">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <IconHash className="size-4" />
            Invoice Details
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <FieldGroup>
            <Field orientation="responsive">
              <FieldLabel htmlFor="invoiceNumber">Invoice Number</FieldLabel>
              <Input
                id="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={(e) => updateField("invoiceNumber", e.target.value)}
                placeholder="INV-001"
              />
            </Field>
            <Field orientation="responsive">
              <FieldLabel htmlFor="invoiceDate">Invoice Date</FieldLabel>
              <Input
                id="invoiceDate"
                type="date"
                value={invoice.invoiceDate}
                onChange={(e) => updateField("invoiceDate", e.target.value)}
              />
            </Field>
            <Field orientation="responsive">
              <FieldLabel htmlFor="dueDate">Due Date</FieldLabel>
              <Input
                id="dueDate"
                type="date"
                value={invoice.dueDate}
                onChange={(e) => updateField("dueDate", e.target.value)}
              />
            </Field>
            <Field orientation="responsive">
              <FieldLabel htmlFor="currency">Currency</FieldLabel>
              <Select
                value={invoice.currency}
                onValueChange={(value) => updateField("currency", value as CurrencyCode)}
              >
                <SelectTrigger id="currency" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </AccordionContent>
      </AccordionItem>

      {/* Sender Details */}
      <AccordionItem value="item-sender">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <IconUser className="size-4" />
            From (Your Details)
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <FieldGroup>
            <Field orientation="responsive">
              <FieldLabel htmlFor="senderName">Name</FieldLabel>
              <Input
                id="senderName"
                value={invoice.sender.name}
                onChange={(e) => updateSender("name", e.target.value)}
                placeholder="Your Business Name"
              />
            </Field>
            <Field orientation="responsive">
              <FieldLabel htmlFor="senderEmail">Email</FieldLabel>
              <Input
                id="senderEmail"
                type="email"
                value={invoice.sender.email}
                onChange={(e) => updateSender("email", e.target.value)}
                placeholder="you@example.com"
              />
            </Field>
            <Field orientation="responsive">
              <FieldLabel htmlFor="senderPhone">Phone</FieldLabel>
              <Input
                id="senderPhone"
                type="tel"
                value={invoice.sender.phone}
                onChange={(e) => updateSender("phone", e.target.value)}
                placeholder="+1 234 567 890"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="senderAddress">Address</FieldLabel>
              <Textarea
                id="senderAddress"
                value={invoice.sender.address}
                onChange={(e) => updateSender("address", e.target.value)}
                placeholder="123 Business St&#10;City, State 12345"
                rows={2}
              />
            </Field>
          </FieldGroup>
        </AccordionContent>
      </AccordionItem>

      {/* Client Details */}
      <AccordionItem value="item-client">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <IconBuilding className="size-4" />
            Bill To (Client Details)
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <FieldGroup>
            <Field orientation="responsive">
              <FieldLabel htmlFor="clientName">Name</FieldLabel>
              <Input
                id="clientName"
                value={invoice.client.name}
                onChange={(e) => updateClient("name", e.target.value)}
                placeholder="Client Name"
              />
            </Field>
            <Field orientation="responsive">
              <FieldLabel htmlFor="clientEmail">Email</FieldLabel>
              <Input
                id="clientEmail"
                type="email"
                value={invoice.client.email}
                onChange={(e) => updateClient("email", e.target.value)}
                placeholder="client@example.com"
              />
            </Field>
            <Field orientation="responsive">
              <FieldLabel htmlFor="clientPhone">Phone</FieldLabel>
              <Input
                id="clientPhone"
                type="tel"
                value={invoice.client.phone}
                onChange={(e) => updateClient("phone", e.target.value)}
                placeholder="+1 234 567 890"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="clientAddress">Address</FieldLabel>
              <Textarea
                id="clientAddress"
                value={invoice.client.address}
                onChange={(e) => updateClient("address", e.target.value)}
                placeholder="456 Client Ave&#10;City, State 67890"
                rows={2}
              />
            </Field>
          </FieldGroup>
        </AccordionContent>
      </AccordionItem>

      {/* Line Items */}
      <AccordionItem value="item-line-items">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <IconList className="size-4" />
            Line Items
          </span>
        </AccordionTrigger>
        <AccordionContent className=" h-auto">
          <LineItemsEditor
            lineItems={invoice.lineItems}
            currency={invoice.currency as CurrencyCode}
            onChange={(items) => updateField("lineItems", items)}
          />
        </AccordionContent>
      </AccordionItem>

      {/* Financials */}
      <AccordionItem value="item-financials">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <IconCalculator className="size-4" />
            Financials
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <FieldGroup>
            <Field orientation="responsive">
              <FieldLabel htmlFor="taxRate">Tax Rate (%)</FieldLabel>
              <Input
                id="taxRate"
                type="number"
                min="0"
                step="0.01"
                value={invoice.taxRate === 0 ? "" : invoice.taxRate}
                onChange={(e) => updateField("taxRate", parseFloat(e.target.value) || 0)}
                placeholder="0"
              />
            </Field>
            <Field orientation="responsive">
              <FieldLabel htmlFor="discountType">Discount Type</FieldLabel>
              <Select
                value={invoice.discount.type}
                onValueChange={(value) => updateDiscount("type", value as "percentage" | "fixed")}
              >
                <SelectTrigger id="discountType" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field orientation="responsive">
              <FieldLabel htmlFor="discountValue">
                Discount Value ({invoice.discount.type === "percentage" ? "%" : "fixed"})
              </FieldLabel>
              <Input
                id="discountValue"
                type="number"
                min="0"
                step="0.01"
                value={invoice.discount.value === 0 ? "" : invoice.discount.value}
                onChange={(e) => updateDiscount("value", parseFloat(e.target.value) || 0)}
                placeholder="0"
              />
            </Field>
          </FieldGroup>
        </AccordionContent>
      </AccordionItem>

      {/* Additional */}
      <AccordionItem value="item-additional">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <IconFileText className="size-4" />
            Additional Information
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="notes">Notes</FieldLabel>
              <Textarea
                id="notes"
                value={invoice.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                placeholder="Thank you for your business!"
                rows={3}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="paymentInstructions">Payment Instructions</FieldLabel>
              <Textarea
                id="paymentInstructions"
                value={invoice.paymentInstructions}
                onChange={(e) => updateField("paymentInstructions", e.target.value)}
                placeholder="Bank: Example Bank&#10;Account: 1234567890&#10;Routing: 987654321"
                rows={3}
              />
            </Field>
          </FieldGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
