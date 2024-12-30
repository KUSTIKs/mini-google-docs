import { useEditorState } from '@tiptap/react';
import { ListCollapseIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEditorStore } from '@/store/use-editor-store';
import { cn } from '@/lib/utils';
import { lineHeights } from '../../constants/line-heights';

const LineHeightButton = () => {
  const { editor } = useEditorStore();
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      lineHeight: lineHeights.find(({ value }) => {
        return editor?.getAttributes('paragraph').lineHeight === value;
      }),
    }),
  });

  const setLineHeight = (lineHeight: string) => {
    editor?.chain().focus().setLineHeight(lineHeight).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <ListCollapseIcon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {lineHeights.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setLineHeight(value)}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editorState?.lineHeight?.value === value && 'bg-neutral-200/80'
            )}
          >
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { LineHeightButton };
