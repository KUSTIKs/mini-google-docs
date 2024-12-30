import { paginationOptsValidator } from 'convex/server';
import { mutation, query } from './_generated/server';
import { ConvexError, v } from 'convex/values';

const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError('Unauthorized');
    }

    const documentId = await ctx.db.insert('documents', {
      title: args.title ?? 'Untitled document',
      ownerId: user.subject,
      initialContent: args.initialContent,
    });

    return documentId;
  },
});

const getAll = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  async handler(ctx, args) {
    const documents = await ctx.db
      .query('documents')
      .paginate(args.paginationOpts);
    return documents;
  },
});

export { getAll, create };
