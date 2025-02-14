'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';

import { Id } from '@convex/_generated/dataModel';
import { api } from '@convex/_generated/api';
import { getColorForString } from '@/lib/utils';
import { User } from './lib/liveblocks';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const getUsers = async () => {
  const { sessionClaims } = await auth();
  const clerk = await clerkClient();

  const organizationId = sessionClaims?.org_id;

  const response = await clerk.users.getUserList({
    organizationId: organizationId ? [organizationId] : undefined,
  });

  const users: User[] = response.data.map((user) => {
    const name =
      user.fullName || user.primaryEmailAddress?.emailAddress || 'Anonymous';
    const color = getColorForString(name);

    return {
      id: user.id,
      name,
      avatarUrl: user.imageUrl,
      color: color,
    };
  });

  return users;
};

const getDocuments = async ({ ids }: { ids: Id<'documents'>[] }) => {
  const documents = await convex.query(api.documents.getByIds, { ids });

  return documents;
};

export { getUsers, getDocuments };
