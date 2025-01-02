import { MessageSquarePlusIcon } from 'lucide-react';
import { useEditorState } from '@tiptap/react';

import { useEditorStore } from '@/store/use-editor-store';
import { ToolButton } from '../toolbar-button';

const CommentButton = () => {
  const { editor } = useEditorStore();
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      hasComment: editor?.isActive('liveblocksCommentMark'),
    }),
  });

  const handleClick = () => {
    editor?.chain().focus().addPendingComment().run();
  };

  return (
    <ToolButton
      icon={MessageSquarePlusIcon}
      onClick={handleClick}
      isActive={editorState.hasComment}
    />
  );
};

export { CommentButton };
