import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { ImageIcon, SearchIcon, UploadIcon } from 'lucide-react';

import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [src, setSrc] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSrc(event.target.value);
  };

  const setImage = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event) => {
      const target = event.target as HTMLInputElement | null;
      const file = target?.files?.[0];

      if (!file) return;

      const imageUrl = URL.createObjectURL(file);

      setImage(imageUrl);

      input.remove();
    };

    input.click();
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (!src) return;

    setImage(src);
    setSrc('');

    setIsDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
            <ImageIcon className='size-4' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleUpload}>
            <UploadIcon className='size-4 mr-2' />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <SearchIcon className='size-4 mr-2' />
            Paste image link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent aria-description='Insert image by url'>
          <DialogHeader>
            <DialogTitle>Insert image</DialogTitle>
            <DialogDescription>Paste image link below</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className='contents'>
            <Input
              placeholder='https://example.com/image.png'
              value={src}
              onChange={handleChange}
            />
            <DialogFooter>
              <Button type='submit'>Insert</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { ImageButton };
