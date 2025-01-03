import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { toast } from 'sonner';
import { LoaderIcon } from 'lucide-react';
import { useMutation } from 'convex/react';
import { BsCloudCheck, BsCloudSlash } from 'react-icons/bs';
import { useStatus } from '@liveblocks/react';

import { useDebounce } from '@/hooks/use-debounce';
import { api } from '@convex/_generated/api';
import { Id } from '@convex/_generated/dataModel';

type Props = {
  title: string;
  id: Id<'documents'>;
};

const DocumentTitle = ({ title, id }: Props) => {
  const status = useStatus();

  const [value, setValue] = useState(title);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const debouncedValue = useDebounce(value, 500);

  const updateDocument = useMutation(api.documents.updateById);

  const updateTitle = useCallback(
    (value: string) => {
      if (value === title) return;

      setIsUpdating(true);
      return updateDocument({
        id,
        title: value,
      })
        .then(() => toast.success('Document updated'))
        .catch(() => toast.error('Something went wrong'))
        .finally(() => {
          setIsUpdating(false);
        });
    },
    [id, title, updateDocument]
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    updateTitle(value)?.then(() => {
      setIsEditing(false);
    });
  };

  useEffect(() => {
    if (debouncedValue === title || !isEditing) return;
    updateTitle(debouncedValue);
  }, [debouncedValue, isEditing, title, updateTitle]);

  const isLoading =
    isUpdating || status === 'connecting' || status === 'reconnecting';
  const isError = status === 'disconnected';

  return (
    <div className='flex items-center gap-2'>
      {isEditing ? (
        <form className='relative w-fit max-w-[50ch]' onSubmit={handleSubmit}>
          <span className='invisible whitespace-pre px-1.5 text-lg'>
            {value || ' '}
          </span>
          <input
            autoFocus
            type='text'
            value={value}
            onChange={handleChange}
            onBlur={() => setIsEditing(false)}
            className='absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate focus:outline-none'
          />
        </form>
      ) : (
        <span
          className='text-lg px-1.5 cursor-pointer truncate'
          onClick={() => setIsEditing(true)}
        >
          {title || 'Untitled'}
        </span>
      )}
      {isLoading ? (
        <LoaderIcon className='size-4 animate-spin text-muted-foreground' />
      ) : isError ? (
        <BsCloudSlash className='size-4' />
      ) : (
        <BsCloudCheck className='size-4' />
      )}
    </div>
  );
};

export { DocumentTitle };
