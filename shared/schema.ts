import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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
export interface User {
  id: string;
  username: string;
  email?: string;
  createdAt?: Date;
}

export interface InsertUser {
  username: string;
  email?: string;
}

// Types pour les effets
export interface Effect {
  id: string;
  name: string;
  description: string;
  code: string;
  parameters?: Record<string, any>;
}

// Types pour les scénarios
export interface Scenario {
  id: string;
  name: string;
  elements: ScenarioElement[];
  logoText?: string;
  storyText?: string;
  mainText?: string;
  sloganText?: string;
}

export interface ScenarioElement {
  id: string;
  type: string;
  content: string;
  position?: { x: number; y: number };
  style?: Record<string, any>;
}
