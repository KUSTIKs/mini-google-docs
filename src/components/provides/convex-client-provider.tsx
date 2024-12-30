'use client';

import { ReactNode } from 'react';
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ClerkProvider, SignIn, useAuth } from '@clerk/clerk-react';
import { FullscreenLoader } from '../fullscreen-loader';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

type Props = {
  children: ReactNode;
};

const ConvexClientProvider = ({ children }: Props) => {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className='flex flex-col items-center justify-center min-h-screen'>
            <SignIn />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <FullscreenLoader label='Auth loading' />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export { ConvexClientProvider };
