'use client';

import { ReactNode, useEffect, useState } from 'react';
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';

import { FullscreenLoader } from '@/components/fullscreen-loader';
import { User } from '../lib/liveblocks';
import { getUsers } from '../actions';
import { toast } from 'sonner';
import { ResolveUsersArgs } from '@liveblocks/node';

type Props = {
  children: ReactNode;
};

type Params = {
  id: string;
};

const Room = ({ children }: Props) => {
  const { id: documentId } = useParams<Params>();
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const fetched = await getUsers();
      setUsers(fetched);
    } catch {
      toast.error('Failed to fetch users');
    }
  };

  const resolveUsers = ({ userIds }: ResolveUsersArgs) => {
    const result = userIds.map((id) => users.find((user) => user.id === id));

    return result;
  };
  const resolveMentionSuggestions = ({ text: search }: { text: string }) => {
    const result = users
      .filter(({ name }) =>
        name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
      .map(({ id }) => id);

    return result;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint='/api/liveblocks-auth'
      resolveUsers={resolveUsers}
      resolveMentionSuggestions={resolveMentionSuggestions}
      resolveRoomsInfo={() => []}
    >
      <RoomProvider id={documentId}>
        <ClientSideSuspense
          fallback={<FullscreenLoader label='Room loading' />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export { Room };
