'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';

import { Id } from '@convex/_generated/dataModel';
import { User } from './lib/liveblocks';
import { api } from '@convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const getUsers = async () => {
  const { sessionClaims } = await auth();
  const clerk = await clerkClient();

  const organizationId = sessionClaims?.org_id;

  const response = await clerk.users.getUserList({
    organizationId: organizationId ? [organizationId] : undefined,
  });

  const users: User[] = response.data.map((user) => ({
    id: user.id,
    name:
      user.fullName || user.primaryEmailAddress?.emailAddress || 'Anonymous',
    avatarUrl: user.imageUrl,
  }));

  return users;
};

const getDocuments = async ({ ids }: { ids: Id<'documents'>[] }) => {
  const documents = await convex.query(api.documents.getByIds, { ids });

  return documents;
};

export { getUsers, getDocuments };
