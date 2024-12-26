import { useEditorState } from '@tiptap/react';
import { ColorChangeHandler, SketchPicker } from 'react-color';

import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HighlighterIcon } from 'lucide-react';

const HightlightColorButton = () => {
  const { editor } = useEditorStore();
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      color: editor?.getAttributes('highlight').color,
    }),
  });

  const handleColorChange: ColorChangeHandler = ({ hex }) => {
    editor?.chain().focus().setHighlight({ color: hex }).run();
  };

  const currentColor = editorState?.color;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <HighlighterIcon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        <SketchPicker color={currentColor} onChange={handleColorChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { HightlightColorButton };
