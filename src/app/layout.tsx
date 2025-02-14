import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { ConvexClientProvider } from '@/components/provides/convex-client-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';

import '@liveblocks/react-ui/styles.css';
import '@liveblocks/react-tiptap/styles.css';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Google docs',
  description: 'Google docs mini-clone',
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <NuqsAdapter>
          <ConvexClientProvider>
            <TooltipProvider>
              <Toaster />
              {children}
            </TooltipProvider>
          </ConvexClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
};

export default RootLayout;
