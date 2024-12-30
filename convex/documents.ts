import { query } from './_generated/server';

const getAll = query({
  handler(ctx) {
    return ctx.db.query('documents').collect();
  },
});

export { getAll };
