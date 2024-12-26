import { Undo2Icon } from 'lucide-react';

import { useEditorStore } from '@/store/use-editor-store';
import { ToolButton } from '../toolbar-button';

const UndoButton = () => {
  const { editor } = useEditorStore();

  const handleClick = () => {
    editor?.chain().focus().undo().run();
  };

  return <ToolButton icon={Undo2Icon} onClick={handleClick} />;
};

export { UndoButton };
