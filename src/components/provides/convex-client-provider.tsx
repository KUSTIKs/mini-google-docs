'use client';

import { ReactNode } from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

type Props = {
  children: ReactNode;
};

const ConvexClientProvider = ({ children }: Props) => {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
};

export { ConvexClientProvider };
