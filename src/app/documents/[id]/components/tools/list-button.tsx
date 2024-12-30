import { useEditorState } from '@tiptap/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEditorStore } from '@/store/use-editor-store';
import { cn } from '@/lib/utils';
import { lists, ListType } from '../../constants/lists';

const ListButton = () => {
  const { editor } = useEditorStore();
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      list: lists.find(({ type }) => editor?.isActive(type)),
    }),
  });

  const setList = (listType: ListType) => {
    if (listType == 'orderedList') {
      editor?.chain().focus().toggleOrderedList().run();
      return;
    }

    editor?.chain().focus().toggleBulletList().run();
  };

  const CurrentIcon = editorState?.list?.icon || lists[0].icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <CurrentIcon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {lists.map(({ label, type, icon: Icon }) => (
          <button
            key={type}
            onClick={() => setList(type)}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editorState?.list?.type === type && 'bg-neutral-200/80'
            )}
          >
            <Icon className='size-4' />
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ListButton };
