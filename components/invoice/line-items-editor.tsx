"use client"

import { type LineItem } from "@/types/invoice"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { IconTrash, IconPlus } from "@tabler/icons-react"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { formatCurrency, calculateLineItemAmount, generateLineItemId } from "@/lib/invoice-utils"
import type { CurrencyCode } from "@/types/invoice"

interface LineItemsEditorProps {
  lineItems: LineItem[]
  currency: CurrencyCode
  onChange: (lineItems: LineItem[]) => void
}

export function LineItemsEditor({ lineItems, currency, onChange }: LineItemsEditorProps) {
  const addLineItem = () => {
    const newItem: LineItem = {
      id: generateLineItemId(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    }
    onChange([...lineItems, newItem])
  }

  const removeLineItem = (id: string) => {
    onChange(lineItems.filter((item) => item.id !== id))
  }

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    onChange(
      lineItems.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          // Recalculate amount if quantity or rate changes
          if (field === "quantity" || field === "rate") {
            updated.amount = calculateLineItemAmount(
              Number(updated.quantity) || 0,
              Number(updated.rate) || 0
            )
          }
          return updated
        }
        return item
      })
    )
  }

  return (
    <FieldGroup >
      <div className="flex items-center justify-between">
        <FieldLabel>Line Items</FieldLabel>
        <Button size="sm" variant="outline" onClick={addLineItem} data-icon="inline-start">
          <IconPlus /> Add Item
        </Button>
      </div>

      {lineItems.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-border rounded-md">
          <p className="text-muted-foreground text-sm">No line items yet. Add your first item above.</p>
        </div>
      ) : (
        <div className="border border-border rounded-md overflow-hidden">
          <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-muted/50 border-b border-border text-xs font-medium text-muted-foreground">
            <div className="col-span-5">Description</div>
            <div className="col-span-2 text-right">Quantity</div>
            <div className="col-span-2 text-right">Rate</div>
            <div className="col-span-2 text-right">Amount</div>
            <div className="col-span-1"></div>
          </div>

          {lineItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-2 px-3 py-2 border-b border-border last:border-b-0 items-start"
            >
              {/* Description */}
              <div className="col-span-5">
                <Input
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                  className=" "

                />
              </div>

              {/* Quantity */}
              <div className="col-span-2">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="1"
                  value={item.quantity === 0 ? "" : item.quantity}
                  onChange={(e) => updateLineItem(item.id, "quantity", parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>

              {/* Rate */}
              <div className="col-span-2">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={item.rate === 0 ? "" : item.rate}
                  onChange={(e) => updateLineItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>

              {/* Amount (read-only) */}
              <div className="col-span-2">
                <div className="h-7 px-2 py-1.5 border border-transparent rounded-md text-right text-sm text-muted-foreground bg-muted/30">
                  {formatCurrency(item.amount, currency)}
                </div>
              </div>

              {/* Delete button */}
              <div className="col-span-1 flex justify-end">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeLineItem(item.id)}
                  className="size-7"
                >
                  <IconTrash className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </FieldGroup>
  )
}
