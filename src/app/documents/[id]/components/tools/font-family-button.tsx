import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import { useEditorState } from '@tiptap/react';
import { ChevronDownIcon } from 'lucide-react';

const fontFamilies = [
  'Arial',
  'Times New Roman',
  'Counrier New',
  'Georgia',
  'Verdana',
];

const FontFamilySelect = () => {
  const { editor } = useEditorStore();
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      fontFamily: editor?.getAttributes('textStyle').fontFamily,
    }),
  });

  const setFontFamily = (value: string) => {
    editor?.chain().focus().setFontFamily(value).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='height-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='truncate'>{editorState?.fontFamily || 'Arial'}</span>
          <ChevronDownIcon className='ml-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {fontFamilies.map((fontFamily) => (
          <button
            key={fontFamily}
            onClick={() => setFontFamily(fontFamily)}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editorState?.fontFamily == fontFamily && 'bg-neutral-200/80'
            )}
            style={{ fontFamily: fontFamily }}
          >
            {fontFamily}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { FontFamilySelect };
