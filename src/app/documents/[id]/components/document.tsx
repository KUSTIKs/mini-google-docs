'use client';

import { Preloaded, usePreloadedQuery } from 'convex/react';

import { Room } from './room';
import { Editor } from './editor';
import { Navbar } from './navbar';
import { Toolbar } from './toolbar';
import { api } from '@convex/_generated/api';

type Props = {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
};

const Document = ({ preloadedDocument }: Props) => {
  const document = usePreloadedQuery(preloadedDocument);

  return (
    <Room>
      <div className='min-h-screen bg-[#fafbfd]'>
        <div className='flex flex-col px-4 pt-2 gap-y-2 sticky top-0 left-0 z-10 bg-[#fafbfd] print:hidden'>
          <Navbar document={document} />
          <Toolbar />
        </div>
        <Editor />
      </div>
    </Room>
  );
};

export { Document };
