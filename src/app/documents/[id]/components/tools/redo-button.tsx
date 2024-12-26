import { Redo2Icon } from 'lucide-react';

import { useEditorStore } from '@/store/use-editor-store';
import { ToolButton } from '../toolbar-button';

const RedoButton = () => {
  const { editor } = useEditorStore();

  const handleClick = () => {
    editor?.chain().focus().redo().run();
  };

  return <ToolButton icon={Redo2Icon} onClick={handleClick} />;
};

export { RedoButton };
