import { ListTodoIcon } from 'lucide-react';
import { useEditorState } from '@tiptap/react';

import { useEditorStore } from '@/store/use-editor-store';
import { ToolButton } from '../toolbar-button';

const ListTodoButton = () => {
  const { editor } = useEditorStore();
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isTaskList: editor?.isActive('taskList'),
    }),
  });

  const handleClick = () => {
    editor?.chain().focus().toggleTaskList().run();
  };

  return (
    <ToolButton
      icon={ListTodoIcon}
      onClick={handleClick}
      isActive={editorState?.isTaskList}
    />
  );
};

export { ListTodoButton };
