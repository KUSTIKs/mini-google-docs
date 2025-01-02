'use client';

import { ReactNode } from 'react';
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';

import { FullscreenLoader } from '@/components/fullscreen-loader';

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
