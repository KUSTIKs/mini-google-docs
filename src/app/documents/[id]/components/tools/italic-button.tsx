import { ItalicIcon } from 'lucide-react';
import { useEditorState } from '@tiptap/react';

import { useEditorStore } from '@/store/use-editor-store';
import { ToolButton } from '../toolbar-button';

const ItalicButton = () => {
  const { editor } = useEditorStore();
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isItalic: editor?.isActive('italic'),
    }),
  });

  const handleClick = () => {
    editor?.chain().focus().toggleItalic().run();
  };

  return (
    <ToolButton
      icon={ItalicIcon}
      onClick={handleClick}
      isActive={editorState?.isItalic}
    />
  );
};

export { ItalicButton };
