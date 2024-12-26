import { useEditorState } from '@tiptap/react';
import { ColorChangeHandler, SketchPicker } from 'react-color';

import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const TextColorButton = () => {
  const { editor } = useEditorStore();
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      color: editor?.getAttributes('textStyle').color,
    }),
  });

  const handleColorChange: ColorChangeHandler = ({ hex }) => {
    editor?.chain().focus().setColor(hex).run();
  };

  const currentColor = editorState?.color || '#000000';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='text-sm select-none'>A</span>
          <div
            className='h-0.5 w-full'
            style={{ backgroundColor: currentColor }}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        <SketchPicker color={currentColor} onChange={handleColorChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TextColorButton };
