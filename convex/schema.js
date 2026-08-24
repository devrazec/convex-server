import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  presence: defineTable({
    room: v.string(),
    user: v.string(),
    lastSeen: v.number(),
  })
    .index("byRoom", ["room"])
    .index("byRoomAndUser", ["room", "user"]),
  content: defineTable({
    id: v.number(),
    reference: v.optional(v.string()),
    title: v.optional(v.string()),
    subtitle: v.optional(v.string()), 
    thumbnail: v.optional(v.string()),
    video: v.optional(v.string()),
    audio: v.optional(v.string()),
    summary: v.optional(v.string()),
    button: v.optional(v.string()),
    type: v.string(),
    category: v.optional(v.string()),
    subject: v.optional(v.string()),
    text_understand: v.optional(v.string()),
    text_reflect: v.optional(v.string()),
    text_act: v.optional(v.string()),
    text_evolve: v.optional(v.string()),
    option_understand: v.optional(v.string()),
    option_reflect: v.optional(v.string()),
    option_act: v.optional(v.string()),
    option_evolve: v.optional(v.string()),
    sort: v.number(),
    enable: v.number(),
    date: v.string(),
  }).index("bySort", ["sort"]),
});

export default schema;
