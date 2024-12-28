import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useEditorState } from '@tiptap/react';

import { useEditorStore } from '@/store/use-editor-store';

const FontSizeButton = () => {
  const { editor } = useEditorStore();
  const editorState = useEditorState({
    editor,
    selector: () => ({
      fontSize: parseInt(editor?.getAttributes('textStyle').fontSize),
    }),
  });
  const [inputValue, setInputValue] = useState('');

  const currentFontSize = editorState?.fontSize || 16;

  const setFontSize = useCallback(
    (value: number) => {
      const isValidSize = value >= 12 && value <= 128;
      if (Number.isNaN(value) || !isValidSize) return;

      editor?.chain().focus().setFontSize(`${value}px`).run();
    },
    [editor]
  );

  const pullInputValue = useCallback(() => {
    const value = currentFontSize.toString();
    setInputValue(value);
  }, [currentFontSize]);

  const pushInputValue = useCallback(() => {
    editor?.commands.focus();

    const newFontSize = Number(inputValue);
    pullInputValue();
    setFontSize(newFontSize);
  }, [editor, inputValue, pullInputValue, setFontSize]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
  };
  const handleBlur = () => {
    pushInputValue();
  };
  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (event.key !== 'Enter') return;
    editor?.commands.focus();
  };

  const incrementFontSize = () => {
    const newFontSize = currentFontSize + 1;
    setFontSize(newFontSize);
  };
  const decrementFontSize = () => {
    const newFontSize = currentFontSize - 1;
    setFontSize(newFontSize);
  };

  useEffect(() => {
    pullInputValue();
  }, [currentFontSize, pullInputValue]);

  return (
    <div className='flex items-center gap-x-0.5'>
      <button
        onClick={incrementFontSize}
        className='h-7 w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 text-sm'
      >
        <PlusIcon className='size-4' />
      </button>
      <input
        type='text'
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className='h-7 w-10 rounded-sm border border-neutral-400 px-1.5  [&:not(:focus):hover]:bg-neutral-200/80 text-sm bg-transparent focus:outline-none focus:ring-0'
      />
      <button
        onClick={decrementFontSize}
        className='h-7 w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 text-sm'
      >
        <MinusIcon className='size-4' />
      </button>
    </div>
  );
};

export { FontSizeButton };
