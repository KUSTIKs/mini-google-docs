'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';

import { User } from './lib/liveblocks';

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

export { getUsers };
