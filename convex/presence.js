import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Clients are considered offline if they haven't sent a heartbeat in this long.
const ONLINE_WINDOW_MS = 30_000;

export const heartbeat = mutation({
  args: { room: v.string(), user: v.string() },
  handler: async (ctx, { room, user }) => {
    const existing = await ctx.db
      .query("presence")
      .withIndex("byRoomAndUser", (q) => q.eq("room", room).eq("user", user))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, { lastSeen: Date.now() });
    } else {
      await ctx.db.insert("presence", { room, user, lastSeen: Date.now() });
    }
  },
});

export const count = query({
  args: { room: v.string() },
  handler: async (ctx, { room }) => {
    const cutoff = Date.now() - ONLINE_WINDOW_MS;
    const rows = await ctx.db
      .query("presence")
      .withIndex("byRoom", (q) => q.eq("room", room))
      .collect();
    return rows.filter((r) => r.lastSeen > cutoff).length;
  },
});
