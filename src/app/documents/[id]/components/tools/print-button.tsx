import { PrinterIcon } from 'lucide-react';

import { ToolButton } from '../toolbar-button';

const PrintButton = () => {
  const handleClick = () => {
    window.print();
  };

  return <ToolButton icon={PrinterIcon} onClick={handleClick} />;
};

export { PrintButton };
