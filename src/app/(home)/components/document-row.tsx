import { useRouter } from 'next/navigation';
import { Building2Icon, CircleUserIcon } from 'lucide-react';
import { SiGoogledocs } from 'react-icons/si';
import { format } from 'date-fns';

import { TableCell, TableRow } from '@/components/ui/table';
import { Doc } from '@convex/_generated/dataModel';
import { DocumentActionsDropdown } from './document-actions-dropdown';

type Props = {
  document: Doc<'documents'>;
};

const DocumentRow = ({ document }: Props) => {
  const router = useRouter();

  const creationDate = new Date(document._creationTime);
  const formattedCreationDate = format(creationDate, 'MMM dd, yyyy');

  const openDocument = () => {
    router.push(`/documents/${document._id}`);
  };

  return (
    <TableRow onClick={openDocument} className='cursor-pointer'>
      <TableCell>
        <div className='flex items-center gap-2'>
          <SiGoogledocs className='size-6 fill-blue-500' />
          <span>{document.title}</span>
        </div>
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        <div className='text-muted-foreground flex items-center gap-2'>
          {document.organizationId ? (
            <Building2Icon className='size-4' />
          ) : (
            <CircleUserIcon className='size-4' />
          )}
          <span>{document.organizationId ? 'Organization' : 'Personal'}</span>
        </div>
      </TableCell>
      <TableCell>{formattedCreationDate}</TableCell>
      <TableCell className='float-right'>
        <DocumentActionsDropdown
          documentId={document._id}
          title={document.title}
        />
      </TableCell>
    </TableRow>
  );
};

export { DocumentRow };
