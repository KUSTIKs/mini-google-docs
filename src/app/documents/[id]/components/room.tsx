'use client';

import { ReactNode, useEffect, useState } from 'react';
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense';
import { ResolveUsersArgs } from '@liveblocks/node';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import { FullscreenLoader } from '@/components/fullscreen-loader';
import { Id } from '@convex/_generated/dataModel';
import { liveblocksInitialStorage } from '../constants/liveblocks';
import { User } from '../lib/liveblocks';
import { getUsers, getDocuments } from '../actions';

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
  const resolveRoomsInfo = async ({ roomIds }: { roomIds: string[] }) => {
    const ids = roomIds as Id<'documents'>[];
    const documents = await getDocuments({ ids });

    return documents;
  };

  const authEndpoint = async () => {
    const url = '/api/liveblocks-auth';
    const params = { room: documentId };

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
    });
    const data = await response.json();

    return data;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={authEndpoint}
      resolveUsers={resolveUsers}
      resolveMentionSuggestions={resolveMentionSuggestions}
      resolveRoomsInfo={resolveRoomsInfo}
    >
      <RoomProvider id={documentId} initialStorage={liveblocksInitialStorage}>
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
