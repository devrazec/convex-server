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
});

export default schema;
