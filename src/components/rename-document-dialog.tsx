import {
  ChangeEventHandler,
  FormEventHandler,
  ReactNode,
  useState,
} from 'react';
import { useMutation } from 'convex/react';
import { DialogProps } from '@radix-ui/react-dialog';
import { toast } from 'sonner';

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
} & Pick<DialogProps, 'onOpenChange'>;

const RenameDocumentDialog = ({
  documentId,
  children,
  initialTitle,
  onOpenChange,
}: Props) => {
  const renameDocumentById = useMutation(api.documents.updateById);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [isOpen, setIsOpen] = useState(false);

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
        onOpenChange?.(false);
        toast.success('Document renamed');
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
    onOpenChange?.(isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
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
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='outline' disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit' disabled={isLoading}>
              Rename
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { RenameDocumentDialog };
