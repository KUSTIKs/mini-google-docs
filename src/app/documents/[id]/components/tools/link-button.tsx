import { ChangeEventHandler, useState } from 'react';
import { Link2Icon } from 'lucide-react';

import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [href, setHref] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setHref(event.target.value);
  };

  const applyHref = () => {
    editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
    setHref('');
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) return;
    setHref(editor?.getAttributes('link').href);
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <Link2Icon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2.5 flex items-center gap-x-2'>
        <Input
          placeholder='https://apple.com'
          value={href}
          onChange={handleChange}
        />
        <Button onClick={applyHref}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { LinkButton };
