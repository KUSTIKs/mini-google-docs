import { ReactNode, useState } from 'react';
import { useMutation } from 'convex/react';

import { api } from '@convex/_generated/api';
import { Id } from '@convex/_generated/dataModel';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

type Props = {
  documentId: Id<'documents'>;
  children: ReactNode;
};

const DeleteDocumentDialog = ({ documentId, children }: Props) => {
  const deleteDocumentById = useMutation(api.documents.deleteById);
  const [isLoading, setIsLoading] = useState(false);

  const deleteDocument = () => {
    setIsLoading(true);
    deleteDocumentById({ id: documentId }).finally(() => {
      setIsLoading(false);
    });
  };

  const stopPropagation = (event: Pick<Event, 'stopPropagation'>) => {
    event.stopPropagation();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent onClick={stopPropagation}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            document.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={stopPropagation}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={deleteDocument} disabled={isLoading}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DeleteDocumentDialog };
