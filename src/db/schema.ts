import { relations } from "drizzle-orm"
import { boolean, index, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 21 }).primaryKey(),
    discordId: varchar("discord_id", { length: 255 }).unique(),
    email: varchar("email", { length: 100 }).unique().notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    hashedPassword: varchar("hashed_password", { length: 255 }),
    avatar: varchar("avatar", { length: 255 }),
    stripeSubscriptionId: varchar("stripe_subscription_id", { length: 191 }),
    stripePriceId: varchar("stripe_price_id", { length: 191 }),
    stripeCustomerId: varchar("stripe_customer_id", { length: 191 }),
    stripeCurrentPeriodEnd: timestamp("stripe_current_period_end"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(() => new Date()),
  },
  (table) => [
    index("user_email_indx").on(table.email),
    index("user_discord_indx").on(table.discordId),
  ]
)

export type User = typeof users.$inferSelect
export const InsertUser = createInsertSchema(users).pick({ email: true })

export const sessions = pgTable(
  "sessions",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 21 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [index("session_user_indx").on(table.userId)]
)

export const emailVerificationCodes = pgTable(
  "email_verification_codes",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 21 }).unique().notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    code: varchar("code", { length: 8 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    index("verification_code_user_indx").on(table.userId),
    index("verification_code_email_indx").on(table.email),
  ]
)

// Define relations
export const emailVerificationCodesRelations = relations(
  emailVerificationCodes,
  ({ one }) => ({
    user: one(users, {
      fields: [emailVerificationCodes.userId],
      references: [users.id],
    }),
  })
)
