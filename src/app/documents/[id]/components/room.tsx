'use client';

import { ReactNode } from 'react';
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';

type Props = {
  children: ReactNode;
};

type Params = {
  id: string;
};

const Room = ({ children }: Props) => {
  const { id: documentId } = useParams<Params>();

  return (
    <LiveblocksProvider throttle={16} authEndpoint='/api/liveblocks-auth'>
      <RoomProvider id={documentId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export { Room };
