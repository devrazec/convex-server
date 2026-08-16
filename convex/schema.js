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
    title: v.string(),
    subtitle: v.optional(v.string()),
    image_url: v.optional(v.string()),
    audio_url: v.optional(v.string()),
    video_url: v.optional(v.string()),
    button_url: v.optional(v.string()),
    type: v.string(),
    sort: v.number(),
    enable: v.number(),
    date: v.string(),
  }).index("bySort", ["sort"]),
});

export default schema;
