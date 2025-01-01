import { ReactNode, useState } from 'react';
import { useMutation } from 'convex/react';
import { AlertDialogProps } from '@radix-ui/react-alert-dialog';
import { toast } from 'sonner';

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
} & Pick<AlertDialogProps, 'onOpenChange'>;

const DeleteDocumentDialog = ({
  documentId,
  children,
  onOpenChange,
}: Props) => {
  const deleteDocumentById = useMutation(api.documents.deleteById);
  const [isLoading, setIsLoading] = useState(false);

  const deleteDocument = () => {
    setIsLoading(true);
    deleteDocumentById({ id: documentId })
      .catch(() => toast.error('Something went wrong'))
      .then(() => toast.success('Document deleted'))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AlertDialog onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            document.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteDocument} disabled={isLoading}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DeleteDocumentDialog };
