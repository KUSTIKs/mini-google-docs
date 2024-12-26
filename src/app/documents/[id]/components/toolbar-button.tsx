import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type Props = {
  onClick: () => void;
  isActive?: boolean;
  icon: LucideIcon;
};

const ToolButton = ({ onClick, isActive = false, icon: Icon }: Props) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80'
      )}
    >
      <Icon className='size-4' />
    </button>
  );
};

export { ToolButton };
