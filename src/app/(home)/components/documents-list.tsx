'use client';

import { usePaginatedQuery } from 'convex/react';
import { LoaderIcon } from 'lucide-react';

import { api } from '@convex/_generated/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useSearchParam } from '@/hooks/use-search-param';
import { DocumentRow } from './document-row';

const DocumentsList = () => {
  const [search] = useSearchParam();
  const {
    results: documents,
    isLoading,
    status,
    loadMore,
  } = usePaginatedQuery(
    api.documents.getAll,
    { search },
    { initialNumItems: 5 }
  );

  const handleLoadMoreClick = () => {
    loadMore(5);
  };

  if (status === 'LoadingFirstPage') {
    return (
      <div className='max-w-screen-xl mx-auto px-16 py-6 flex justify-center items-center h-24'>
        <LoaderIcon className='animate-spin text-muted-foreground size-5' />
      </div>
    );
  }

  return (
    <div className='max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className='hidden md:table-cell '>Shared</TableHead>
            <TableHead>Created at</TableHead>
          </TableRow>
        </TableHeader>
        {documents.length === 0 && (
          <TableBody>
            <TableRow className='hover:bg-transparent'>
              <TableCell
                colSpan={3}
                className='h-24 text-center text-muted-foreground'
              >
                No documents found
              </TableCell>
            </TableRow>
          </TableBody>
        )}
        <TableBody>
          {documents.map((document) => (
            <DocumentRow key={document._id} document={document} />
          ))}
        </TableBody>
      </Table>
      <div className='flex items-center justify-center'>
        {status === 'CanLoadMore' ? (
          <Button
            variant='ghost'
            size='sm'
            onClick={handleLoadMoreClick}
            disabled={isLoading}
          >
            Load more
          </Button>
        ) : (
          <p className='text-sm text-muted-foreground'>End of results</p>
        )}
      </div>
    </div>
  );
};

export { DocumentsList };
