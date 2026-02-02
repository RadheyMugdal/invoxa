"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { IconDots, IconEdit, IconTrash, IconDownload } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDate, formatCurrency } from "@/lib/invoice-utils"
import type { CurrencyCode } from "@/types/invoice"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { downloadAsPDF } from "@/lib/pdf-generator"

// This type is based on the invoice schema returned from the API
export type InvoiceTableRow = {
  id: string
  invoiceName: string
  invoiceNumber: string
  clientName: string
  invoiceDate: Date | string
  dueDate: Date | string
  total: number | string
  currency: string
  status?: string
  createdAt: Date | string
  updatedAt: Date | string
  userId: string
}

interface InvoiceColumnsProps {
  onDelete: (id: string) => void
}

export function createInvoiceColumns({ onDelete }: InvoiceColumnsProps): ColumnDef<InvoiceTableRow>[] {
  const router = useRouter()

  const handleDownload = async (invoice: InvoiceTableRow) => {
    try {
      const filename = `${invoice.invoiceNumber.replace(/\s+/g, "-")}.pdf`
      await downloadAsPDF(
        {
          invoiceNumber: invoice.invoiceNumber,
          invoiceDate: new Date(invoice.invoiceDate).toISOString().split("T")[0],
          dueDate: new Date(invoice.dueDate).toISOString().split("T")[0],
          currency: invoice.currency as CurrencyCode,
          sender: {
            name: "", // Will be populated when fetching full invoice
            email: "",
            phone: "",
            address: "",
          },
          client: {
            name: invoice.clientName,
            email: "",
            phone: "",
            address: "",
          },
          lineItems: [], // Will be populated when fetching full invoice
          taxRate: 0,
          discount: {
            type: "percentage" as const,
            value: 0,
          },
          notes: "",
          paymentInstructions: "",
        },
        filename
      )
      toast.success("PDF downloaded successfully!")
    } catch (error) {
      toast.error("Failed to download PDF. Please try again.")
    }
  }

  return [
    {
      accessorKey: "invoiceName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-medium"
          >
            Invoice Name
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("invoiceName")}</div>,
    },
    {
      accessorKey: "invoiceNumber",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-medium"
          >
            Invoice Number
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="">{row.getValue("invoiceNumber")}</div>,
    },
    {
      accessorKey: "clientName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-medium"
          >
            Client
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("clientName")}</div>,
    },
    {
      accessorKey: "invoiceDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-medium"
          >
            Date
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = row.getValue("invoiceDate")
        return <div>{formatDate(new Date(date as string))}</div>
      },
    },
    {
      accessorKey: "total",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-medium"
          >
            Total
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const total = parseFloat(row.getValue("total") as string)
        const currency = row.original.currency as CurrencyCode

        return (
          <div className="text-right font-medium">
            {formatCurrency(total, currency)}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const invoice = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <IconDots className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => router.push(`/dashboard/edit/${invoice.id}`)}
              >
                <IconEdit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload(invoice)}>
                <IconDownload className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(invoice.id)}
                className="text-destructive"
              >
                <IconTrash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
