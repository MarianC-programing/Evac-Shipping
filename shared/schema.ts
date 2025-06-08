import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  password: text("password").notNull(),
  mailboxId: text("mailbox_id").notNull().unique(),
  memberSince: timestamp("member_since").notNull().defaultNow(),
  plan: text("plan").notNull().default("basic"),
});

export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  trackingId: text("tracking_id").notNull().unique(),
  userId: integer("user_id").references(() => users.id).notNull(),
  description: text("description").notNull(),
  weight: text("weight").notNull(),
  status: text("status").notNull().default("received_us"),
  estimatedDate: timestamp("estimated_date"),
  receivedDate: timestamp("received_date"),
  transitDate: timestamp("transit_date"),
  arrivedDate: timestamp("arrived_date"),
  readyDate: timestamp("ready_date"),
  deliveredDate: timestamp("delivered_date"),
  cost: text("cost"),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  type: text("type").notNull(),
  packageNumber: text("package_number"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  resolved: boolean("resolved").notNull().default(false),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  mailboxId: true,
  memberSince: true,
}).extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Contraseña requerida"),
});

export const insertPackageSchema = createInsertSchema(packages).omit({
  id: true,
  trackingId: true,
  userId: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
  resolved: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type Package = typeof packages.$inferSelect;
export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
