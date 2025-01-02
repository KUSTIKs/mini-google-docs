import { paginationOptsValidator } from 'convex/server';
import { mutation, query } from './_generated/server';
import { ConvexError, v } from 'convex/values';
import { parseString } from '@/lib/utils';

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

    const organizationId = parseString(user.organization_id);

    const documentId = await ctx.db.insert('documents', {
      title: args.title ?? 'Untitled document',
      ownerId: user.subject,
      initialContent: args.initialContent,
      organizationId,
    });

    return documentId;
  },
});

const getAll = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  async handler(ctx, { paginationOpts, search }) {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError('Unauthorized');
    }

    const organizationId = parseString(user.organization_id);

    if (search && organizationId) {
      const documents = await ctx.db
        .query('documents')
        .withSearchIndex('search_title', (q) =>
          q.search('title', search).eq('organizationId', organizationId)
        )
        .paginate(paginationOpts);

      return documents;
    } else if (organizationId) {
      const documents = await ctx.db
        .query('documents')
        .withIndex('by_organization_id', (q) =>
          q.eq('organizationId', organizationId)
        )
        .paginate(paginationOpts);

      return documents;
    }

    if (search) {
      const documents = await ctx.db
        .query('documents')
        .withSearchIndex('search_title', (q) =>
          q.search('title', search).eq('ownerId', user.subject)
        )
        .paginate(paginationOpts);

      return documents;
    }

    const documents = await ctx.db
      .query('documents')
      .withIndex('by_owner_id', (q) => q.eq('ownerId', user.subject))
      .paginate(paginationOpts);

    return documents;
  },
});

const getById = query({
  args: { id: v.id('documents') },
  async handler(ctx, { id }) {
    const document = await ctx.db.get(id);

    if (!document) {
      throw new ConvexError('Document not found');
    }

    return document;
  },
});

const getByIds = query({
  args: { ids: v.array(v.id('documents')) },
  async handler(ctx, { ids }) {
    const documents = [];

    for (const id of ids) {
      const document = await ctx.db.get(id);

      documents.push({
        id,
        name: document?.title ?? '[Removed]',
      });
    }

    return documents;
  },
});

const updateById = mutation({
  args: {
    id: v.id('documents'),
    title: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError('Unauthorized');
    }

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError('Document not found');
    }

    const organizationId = parseString(user.organization_id);

    const isOwner = document.ownerId === user.subject;
    const isOrgMember =
      !!document.organizationId && document.organizationId === organizationId;

    if (!isOwner && !isOrgMember) {
      throw new ConvexError('Unauthorized');
    }

    return await ctx.db.patch(args.id, {
      title: args.title,
    });
  },
});

const deleteById = mutation({
  args: {
    id: v.id('documents'),
  },
  async handler(ctx, args) {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError('Unauthorized');
    }

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError('Document not found');
    }

    const organizationId = parseString(user.organization_id);

    const isOwner = document.ownerId === user.subject;
    const isOrgMember =
      !!document.organizationId && document.organizationId === organizationId;

    if (!isOwner && !isOrgMember) {
      throw new ConvexError('Unauthorized');
    }

    return await ctx.db.delete(args.id);
  },
});

export { create, getAll, getById, getByIds, updateById, deleteById };
