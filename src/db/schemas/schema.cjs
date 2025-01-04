"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.votes = exports.likes = exports.ideas = exports.events = exports.admin = void 0;
var _pgCore = require("drizzle-orm/pg-core");
var _drizzleOrm = require("drizzle-orm");
const events = exports.events = (0, _pgCore.pgTable)("events", {
  id: (0, _pgCore.serial)().primaryKey().notNull(),
  title: (0, _pgCore.varchar)({
    length: 255
  }).notNull(),
  eventDate: (0, _pgCore.date)("event_date").notNull(),
  createdAt: (0, _pgCore.timestamp)("created_at", {
    mode: 'string'
  }).default((0, _drizzleOrm.sql)`CURRENT_TIMESTAMP`),
  stage: (0, _pgCore.integer)().default(1)
});
const ideas = exports.ideas = (0, _pgCore.pgTable)("ideas", {
  id: (0, _pgCore.serial)().primaryKey().notNull(),
  email: (0, _pgCore.varchar)({
    length: 255
  }).notNull(),
  idea: (0, _pgCore.text)().notNull(),
  description: (0, _pgCore.text)().notNull(),
  technologies: (0, _pgCore.text)().notNull(),
  likes: (0, _pgCore.integer)().default(0),
  createdAt: (0, _pgCore.timestamp)("created_at", {
    mode: 'string'
  }).default((0, _drizzleOrm.sql)`CURRENT_TIMESTAMP`),
  updatedAt: (0, _pgCore.timestamp)("updated_at", {
    mode: 'string'
  }),
  eventId: (0, _pgCore.integer)("event_id"),
  isBuilt: (0, _pgCore.boolean)("is_built").default(false),
  stage: (0, _pgCore.integer)().default(1),
  averageScore: (0, _pgCore.doublePrecision)("average_score").default(0)
}, table => {
  return {
    ideasEventIdFkey: (0, _pgCore.foreignKey)({
      columns: [table.eventId],
      foreignColumns: [events.id],
      name: "ideas_event_id_fkey"
    }).onDelete("cascade")
  };
});
const likes = exports.likes = (0, _pgCore.pgTable)("likes", {
  id: (0, _pgCore.serial)().primaryKey().notNull(),
  userEmail: (0, _pgCore.varchar)("user_email", {
    length: 255
  }).notNull(),
  ideaId: (0, _pgCore.integer)("idea_id").notNull(),
  likedAt: (0, _pgCore.timestamp)("liked_at", {
    mode: 'string'
  }).default((0, _drizzleOrm.sql)`CURRENT_TIMESTAMP`)
}, table => {
  return {
    likesIdeaIdFkey: (0, _pgCore.foreignKey)({
      columns: [table.ideaId],
      foreignColumns: [ideas.id],
      name: "likes_idea_id_fkey"
    }).onDelete("cascade")
  };
});
const admin = exports.admin = (0, _pgCore.pgTable)("admin", {
  email: (0, _pgCore.varchar)({
    length: 255
  }).primaryKey().notNull()
});
const votes = exports.votes = (0, _pgCore.pgTable)("votes", {
  id: (0, _pgCore.serial)().primaryKey().notNull(),
  userEmail: (0, _pgCore.varchar)("user_email", {
    length: 255
  }).notNull(),
  ideaId: (0, _pgCore.integer)("idea_id").notNull(),
  rating: (0, _pgCore.integer)().notNull(),
  createdAt: (0, _pgCore.timestamp)("created_at", {
    mode: 'string'
  }).default((0, _drizzleOrm.sql)`CURRENT_TIMESTAMP`)
}, table => {
  return {
    votesIdeaIdFkey: (0, _pgCore.foreignKey)({
      columns: [table.ideaId],
      foreignColumns: [ideas.id],
      name: "votes_idea_id_fkey"
    }).onDelete("cascade"),
    votesRatingCheck: (0, _pgCore.check)("votes_rating_check", (0, _drizzleOrm.sql)`(rating >= 1) AND (rating <= 10)`)
  };
});
