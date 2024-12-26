import { RemoveFormattingIcon } from 'lucide-react';

import { useEditorStore } from '@/store/use-editor-store';
import { ToolButton } from '../toolbar-button';

const RemoveFormattingButton = () => {
  const { editor } = useEditorStore();

  const handleClick = () => {
    editor?.chain().focus().unsetAllMarks().run();
  };

  return <ToolButton icon={RemoveFormattingIcon} onClick={handleClick} />;
};

export { RemoveFormattingButton };
