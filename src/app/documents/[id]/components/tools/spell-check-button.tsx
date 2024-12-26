import { SpellCheckIcon } from 'lucide-react';

import { useEditorStore } from '@/store/use-editor-store';
import { ToolButton } from '../toolbar-button';

const SpellCheckButton = () => {
  const { editor } = useEditorStore();

  const handleClick = () => {
    const currentValue = editor?.view.dom.getAttribute('spellcheck');
    const newValue = String(currentValue !== 'true');

    editor?.view.dom.setAttribute('spellcheck', newValue);
  };

  return <ToolButton icon={SpellCheckIcon} onClick={handleClick} />;
};

export { SpellCheckButton };
