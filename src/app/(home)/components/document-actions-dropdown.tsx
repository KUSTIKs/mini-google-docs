import {
  ExternalLinkIcon,
  FilePenIcon,
  MoreVerticalIcon,
  TrashIcon,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DeleteDocumentDialog } from '@/components/delete-document-dialog';
import { RenameDocumentDialog } from '@/components/rename-document-dialog';
import { Id } from '@convex/_generated/dataModel';
import { useState } from 'react';

type Props = {
  documentId: Id<'documents'>;
  title: string;
};

const DocumentActionsDropdown = ({ documentId, title }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openInNewTab = () => {
    window.open(`/documents/${documentId}`, '_blank');
  };

  const preventDefault = (event: Pick<Event, 'preventDefault'>) => {
    event.preventDefault();
  };
  const stopPropagation = (event: Pick<Event, 'stopPropagation'>) => {
    event.stopPropagation();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='rounded-full'>
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent onClick={stopPropagation}>
        <RenameDocumentDialog
          documentId={documentId}
          initialTitle={title}
          onOpenChange={setIsOpen}
        >
          <DropdownMenuItem onSelect={preventDefault}>
            <FilePenIcon className='size-4 mr-2' />
            Rename
          </DropdownMenuItem>
        </RenameDocumentDialog>
        <DeleteDocumentDialog documentId={documentId} onOpenChange={setIsOpen}>
          <DropdownMenuItem onSelect={preventDefault}>
            <TrashIcon className='size-4 mr-2' />
            Remove
          </DropdownMenuItem>
        </DeleteDocumentDialog>
        <DropdownMenuItem onClick={openInNewTab}>
          <ExternalLinkIcon className='size-4 mr-2' />
          Open in a new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { DocumentActionsDropdown };
