import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    subject_id: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    if (args.subject_id !== undefined) {
      return await ctx.db
        .query("feedback")
        .withIndex("bySort", (q) => q.eq("subject_id", args.subject_id))
        .collect();
    }
    return await ctx.db.query("feedback").collect();
  },
});

export const get = query({
  args: { id: v.id("feedback") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    subject_id: v.number(),
    user: v.optional(v.string()),
    answer: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("feedback", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("feedback"),
    subject_id: v.optional(v.number()),
    user: v.optional(v.string()),
    answer: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
    return await ctx.db.get(id);
  },
});

export const remove = mutation({
  args: { id: v.id("feedback") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});
