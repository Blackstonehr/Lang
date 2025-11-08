import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Programs table - study abroad programs
export const programs = pgTable("programs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  destination: text("destination").notNull(), // e.g., "Tokyo, Japan"
  country: text("country").notNull(), // e.g., "Japan"
  title: text("title").notNull(), // e.g., "Summer Language Immersion"
  description: text("description").notNull(),
  duration: text("duration").notNull(), // e.g., "4 weeks", "1 semester"
  startDate: text("start_date").notNull(), // e.g., "July 2025"
  endDate: text("end_date").notNull(),
  price: integer("price").notNull(), // in USD
  level: text("level").notNull(), // e.g., "High School", "College", "18+"
  highlights: text("highlights").array().notNull(), // Array of key features
  imageUrl: text("image_url").notNull(),
  featured: text("featured").notNull().default("false"), // "true" or "false" as text
  spotsAvailable: integer("spots_available").notNull(),
});

export const insertProgramSchema = createInsertSchema(programs).omit({
  id: true,
});

export type InsertProgram = z.infer<typeof insertProgramSchema>;
export type Program = typeof programs.$inferSelect;

// Contact submissions table
export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  programInterest: text("program_interest"), // Which program they're interested in
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions)
  .omit({
    id: true,
    createdAt: true,
  })
  .extend({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    programInterest: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters").max(1000),
  });

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Keep existing users table for compatibility
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
