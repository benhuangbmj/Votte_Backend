import {
  pgTable,
  serial,
  varchar,
  date,
  timestamp,
  integer,
  foreignKey,
  text,
  boolean,
  doublePrecision,
  check,
  time,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const events = pgTable("events", {
  id: serial().primaryKey().notNull(),
  title: varchar({ length: 255 }).notNull(),
  eventDate: date("event_date").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  stage: integer().default(1),
  eventTime: time(),
});

export const ideas = pgTable(
  "ideas",
  {
    id: serial().primaryKey().notNull(),
    email: varchar({ length: 255 }).notNull(),
    idea: text().notNull(),
    description: text().notNull(),
    technologies: text().notNull(),
    likes: integer().default(0),
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
    updatedAt: timestamp("updated_at", { mode: "string" }),
    eventId: integer("event_id"),
    isBuilt: boolean("is_built").default(false),
    stage: integer().default(1),
    averageScore: doublePrecision("average_score").default(0),
  },
  (table) => {
    return {
      ideasEventIdFkey: foreignKey({
        columns: [table.eventId],
        foreignColumns: [events.id],
        name: "ideas_event_id_fkey",
      }).onDelete("cascade"),
    };
  }
);

export const likes = pgTable(
  "likes",
  {
    id: serial().primaryKey().notNull(),
    userEmail: varchar("user_email", { length: 255 }).notNull(),
    ideaId: integer("idea_id").notNull(),
    likedAt: timestamp("liked_at", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
  },
  (table) => {
    return {
      likesIdeaIdFkey: foreignKey({
        columns: [table.ideaId],
        foreignColumns: [ideas.id],
        name: "likes_idea_id_fkey",
      }).onDelete("cascade"),
    };
  }
);

export const admin = pgTable("admin", {
  email: varchar({ length: 255 }).primaryKey().notNull(),
});

export const votes = pgTable(
  "votes",
  {
    id: serial().primaryKey().notNull(),
    userEmail: varchar("user_email", { length: 255 }).notNull(),
    ideaId: integer("idea_id").notNull(),
    rating: integer().notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
  },
  (table) => {
    return {
      votesIdeaIdFkey: foreignKey({
        columns: [table.ideaId],
        foreignColumns: [ideas.id],
        name: "votes_idea_id_fkey",
      }).onDelete("cascade"),
      votesRatingCheck: check(
        "votes_rating_check",
        sql`(rating >= 1) AND (rating <= 10)`
      ),
    };
  }
);
