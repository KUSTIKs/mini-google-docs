import { UnderlineIcon } from 'lucide-react';
import { useEditorState } from '@tiptap/react';

import { useEditorStore } from '@/store/use-editor-store';
import { ToolButton } from '../toolbar-button';

const UnderlineButton = () => {
  const { editor } = useEditorStore();
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isUnderline: editor?.isActive('underline'),
    }),
  });

  const handleClick = () => {
    editor?.chain().focus().toggleUnderline().run();
  };

  return (
    <ToolButton
      icon={UnderlineIcon}
      onClick={handleClick}
      isActive={editorState?.isUnderline}
    />
  );
};

export { UnderlineButton };
