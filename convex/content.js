import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let items = await ctx.db.query("content").withIndex("bySort").order("asc").collect();

    if (args.type !== undefined) {
      items = items.filter((item) => item.type === args.type);
    }
    return items;
  },
});

export const get = query({
  args: { id: v.id("content") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    sqlite_id: v.number(),
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
    action: v.optional(v.string()),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("content", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("content"),
    sqlite_id: v.optional(v.number()),
    reference: v.optional(v.string()),
    title: v.optional(v.string()),
    subtitle: v.optional(v.string()),
    thumbnail: v.optional(v.string()),
    video: v.optional(v.string()),
    audio: v.optional(v.string()),
    summary: v.optional(v.string()),
    button: v.optional(v.string()),
    type: v.optional(v.string()),
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
    sort: v.optional(v.number()),
    enable: v.optional(v.number()),
    action: v.optional(v.string()),
    date: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
    return await ctx.db.get(id);
  },
});

export const remove = mutation({
  args: { id: v.id("content") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

