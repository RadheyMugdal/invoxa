import { pgTable, index, foreignKey, unique, text, timestamp, numeric, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const invoice = pgTable("invoice", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	invoiceName: text("invoice_name").default('Untitled Invoice').notNull(),
	invoiceNumber: text("invoice_number").notNull(),
	invoiceDate: timestamp("invoice_date", { mode: 'string' }).notNull(),
	dueDate: timestamp("due_date", { mode: 'string' }).notNull(),
	currency: text().default('USD').notNull(),
	senderName: text("sender_name").notNull(),
	senderEmail: text("sender_email").notNull(),
	senderPhone: text("sender_phone").notNull(),
	senderAddress: text("sender_address").notNull(),
	clientName: text("client_name").notNull(),
	clientEmail: text("client_email").notNull(),
	clientPhone: text("client_phone").notNull(),
	clientAddress: text("client_address").notNull(),
	taxRate: numeric("tax_rate", { precision: 5, scale:  2 }).default('0').notNull(),
	discountType: text("discount_type").default('percentage').notNull(),
	discountValue: numeric("discount_value", { precision: 12, scale:  2 }).default('0').notNull(),
	subtotal: numeric({ precision: 12, scale:  2 }).default('0').notNull(),
	taxAmount: numeric("tax_amount", { precision: 12, scale:  2 }).default('0').notNull(),
	discountAmount: numeric("discount_amount", { precision: 12, scale:  2 }).default('0').notNull(),
	total: numeric({ precision: 12, scale:  2 }).default('0').notNull(),
	notes: text().default('),
	paymentInstructions: text("payment_instructions").default('),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	index("invoice_invoiceNumber_idx").using("btree", table.invoiceNumber.asc().nullsLast().op("text_ops")),
	index("invoice_userId_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "invoice_user_id_user_id_fk"
		}).onDelete("cascade"),
	unique("invoice_invoice_number_unique").on(table.invoiceNumber),
]);

export const lineItem = pgTable("line_item", {
	id: text().primaryKey().notNull(),
	invoiceId: text("invoice_id").notNull(),
	description: text().notNull(),
	quantity: numeric({ precision: 10, scale:  2 }).notNull(),
	rate: numeric({ precision: 12, scale:  2 }).notNull(),
	amount: numeric({ precision: 12, scale:  2 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("line_item_invoiceId_idx").using("btree", table.invoiceId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.invoiceId],
			foreignColumns: [invoice.id],
			name: "line_item_invoice_id_invoice_id_fk"
		}).onDelete("cascade"),
]);

export const session = pgTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	token: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull(),
}, (table) => [
	index("session_userId_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_user_id_user_id_fk"
		}).onDelete("cascade"),
	unique("session_token_unique").on(table.token),
]);

export const verification = pgTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("verification_identifier_idx").using("btree", table.identifier.asc().nullsLast().op("text_ops")),
]);

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const account = pgTable("account", {
	id: text().primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull(),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: 'string' }),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: 'string' }),
	scope: text(),
	password: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	index("account_userId_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_user_id_user_id_fk"
		}).onDelete("cascade"),
]);
