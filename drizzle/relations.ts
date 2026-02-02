import { relations } from "drizzle-orm/relations";
import { user, invoice, lineItem, session, account } from "./schema";

export const invoiceRelations = relations(invoice, ({one, many}) => ({
	user: one(user, {
		fields: [invoice.userId],
		references: [user.id]
	}),
	lineItems: many(lineItem),
}));

export const userRelations = relations(user, ({many}) => ({
	invoices: many(invoice),
	sessions: many(session),
	accounts: many(account),
}));

export const lineItemRelations = relations(lineItem, ({one}) => ({
	invoice: one(invoice, {
		fields: [lineItem.invoiceId],
		references: [invoice.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));