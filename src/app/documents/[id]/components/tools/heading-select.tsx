import { ChevronDownIcon } from 'lucide-react';
import { useEditorState } from '@tiptap/react';
import { Level } from '@tiptap/extension-heading';

import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { headings } from '../../constants/headings';

const HeadingSelect = () => {
  const { editor } = useEditorStore();
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      heading: headings.find(({ level }) =>
        editor?.isActive('heading', { level })
      ),
    }),
  });

  const setHeading = (level: Level) => {
    editor?.chain().focus().toggleHeading({ level }).run();
  };
  const resetHeading = () => {
    editor?.chain().focus().setParagraph().run();
  };

  const currentValue = editorState?.heading
    ? `Heading ${editorState.heading.level}`
    : 'Normal text';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='truncate'>{currentValue}</span>
          <ChevronDownIcon className='ml-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        <button
          onClick={() => resetHeading()}
          className={cn(
            'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
            !editorState?.heading && 'bg-neutral-200/80'
          )}
        >
          Normal text
        </button>
        {headings.map(({ fontSize, level }) => (
          <button
            key={level}
            onClick={() => setHeading(level)}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editorState?.heading?.level === level && 'bg-neutral-200/80'
            )}
            style={{ fontSize }}
          >
            {`Heading ${level}`}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { HeadingSelect };
