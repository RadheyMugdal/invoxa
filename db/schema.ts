import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, numeric, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",(t)=>({
    id: text('id').primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }),
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  (t) => ({
    id: text("id").primaryKey(), 
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  }),
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);


export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  createdShares: many(invoiceShare),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

// Invoice tables
export const invoice = pgTable(
  "invoice",
  (t)=>(
    {
    id: t.uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    invoiceName: text("invoice_name").notNull().default("Untitled Invoice"),
    invoiceNumber: text("invoice_number").notNull().unique(),
    invoiceDate: timestamp("invoice_date").notNull(),
    dueDate: timestamp("due_date").notNull(),
    currency: text("currency").notNull().default("USD"),
    // Sender details
    senderName: text("sender_name").notNull(),
    senderEmail: text("sender_email").notNull(),
    senderPhone: text("sender_phone").notNull(),
    senderAddress: text("sender_address").notNull(),
    // Client details
    clientName: text("client_name").notNull(),
    clientEmail: text("client_email").notNull(),
    clientPhone: text("client_phone").notNull(),
    clientAddress: text("client_address").notNull(),
    // Financials
    taxRate: numeric("tax_rate", { precision: 5, scale: 2 }).notNull().default("0"),
    discountType: text("discount_type").notNull().default("percentage"),
    discountValue: numeric("discount_value", { precision: 12, scale: 2 }).notNull().default("0"),
    // Totals
    subtotal: numeric("subtotal", { precision: 12, scale: 2 }).notNull().default("0"),
    taxAmount: numeric("tax_amount", { precision: 12, scale: 2 }).notNull().default("0"),
    discountAmount: numeric("discount_amount", { precision: 12, scale: 2 }).notNull().default("0"),
    total: numeric("total", { precision: 12, scale: 2 }).notNull().default("0"),
    // Additional fields
    notes: text("notes").default(""),
    paymentInstructions: text("payment_instructions").default(""),
    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }
  ),
  (table) => [
    index("invoice_userId_idx").on(table.userId),
    index("invoice_invoiceNumber_idx").on(table.invoiceNumber),
  ]
);

export const lineItem = pgTable(
  "line_item",
  (t)=>(
    {
    id: t.uuid("id").defaultRandom().primaryKey(),
    invoiceId: t.uuid("id")
      .notNull()
      .references(() => invoice.id, { onDelete: "cascade" }),
    description: text("description").notNull(),
    quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull(),
    rate: numeric("rate", { precision: 12, scale: 2 }).notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  }
  ),
  (table) => [index("line_item_invoiceId_idx").on(table.invoiceId)]
);

export const invoiceShare = pgTable(
  "invoice_share",
  (t) => ({
    id: t.uuid("id").defaultRandom().primaryKey(),
    invoiceId: t.uuid("invoice_id")
      .notNull()
      .references(() => invoice.id, { onDelete: "cascade" }),
    shareToken: t.text("share_token").notNull().unique(),
    createdBy: t.text("created_by")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    isActive: t.boolean("is_active").notNull().default(true),
    createdAt: t.timestamp("created_at").defaultNow().notNull(),
    lastViewedAt: t.timestamp("last_viewed_at"),
    viewCount: t.integer("view_count").notNull().default(0),
  }),
  (table) => [
    index("invoice_share_invoice_id_idx").on(table.invoiceId),
    index("invoice_share_share_token_idx").on(table.shareToken),
    index("invoice_share_created_by_idx").on(table.createdBy),
  ]
);

// Relations
export const invoiceRelations = relations(invoice, ({ one, many }) => ({
  user: one(user, {
    fields: [invoice.userId],
    references: [user.id],
  }),
  lineItems: many(lineItem),
  shares: many(invoiceShare),
}));

export const lineItemRelations = relations(lineItem, ({ one }) => ({
  invoice: one(invoice, {
    fields: [lineItem.invoiceId],
    references: [invoice.id],
  }),
}));

export const invoiceShareRelations = relations(invoiceShare, ({ one }) => ({
  invoice: one(invoice, {
    fields: [invoiceShare.invoiceId],
    references: [invoice.id],
  }),
  creator: one(user, {
    fields: [invoiceShare.createdBy],
    references: [user.id],
  }),
}));
