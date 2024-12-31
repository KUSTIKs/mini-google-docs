import {
  ChangeEventHandler,
  FormEventHandler,
  ReactNode,
  useState,
} from 'react';
import { useMutation } from 'convex/react';

import { api } from '@convex/_generated/api';
import { Id } from '@convex/_generated/dataModel';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';

type Props = {
  documentId: Id<'documents'>;
  children: ReactNode;
  initialTitle: string;
};

const RenameDocumentDialog = ({
  documentId,
  children,
  initialTitle,
}: Props) => {
  const renameDocumentById = useMutation(api.documents.updateById);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [isOpen, setIsOpen] = useState(true);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.target.value);
  };
  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    const formattedTitle = title.trim();
    if (formattedTitle.length === 0) {
      return;
    }

    setIsLoading(true);
    renameDocumentById({
      id: documentId,
      title,
    })
      .then(() => {
        setIsOpen(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const stopPropagation = (event: Pick<Event, 'stopPropagation'>) => {
    event.stopPropagation();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={stopPropagation}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
            <DialogDescription>
              Enter a new name for this document
            </DialogDescription>
          </DialogHeader>
          <div className='my-4'>
            <Input
              value={title}
              onChange={handleChange}
              placeholder='Document name'
              onClick={stopPropagation}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type='button'
                variant='ghost'
                disabled={isLoading}
                onClick={stopPropagation}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='submit'
              disabled={isLoading}
              onClick={stopPropagation}
            >
              Rename
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { RenameDocumentDialog };
