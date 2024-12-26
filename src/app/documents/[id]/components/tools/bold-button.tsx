import { BoldIcon } from 'lucide-react';
import { useEditorState } from '@tiptap/react';

import { useEditorStore } from '@/store/use-editor-store';
import { ToolButton } from '../toolbar-button';

const BoldButton = () => {
  const { editor } = useEditorStore();
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor?.isActive('bold'),
    }),
  });

  const handleClick = () => {
    editor?.chain().focus().toggleBold().run();
  };

  return (
    <ToolButton
      icon={BoldIcon}
      onClick={handleClick}
      isActive={editorState?.isBold}
    />
  );
};

export { BoldButton };
