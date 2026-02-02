import { InvoiceData } from "./invoice";

export interface InvoiceWithId extends InvoiceData {
  id: string;
  invoiceName: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceListItem {
  id: string;
  invoiceName: string;
  invoiceNumber: string;
  clientName: string;
  invoiceDate: string;
  total: number;
  currency: string;
  createdAt: string;
}
