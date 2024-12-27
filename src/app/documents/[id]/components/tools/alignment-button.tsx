import { useEditorState } from '@tiptap/react';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  LucideIcon,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEditorStore } from '@/store/use-editor-store';
import { cn } from '@/lib/utils';

type Alignment = {
  label: string;
  value: string;
  icon: LucideIcon;
};

const alignemnts: Alignment[] = [
  {
    label: 'Align left',
    value: 'left',
    icon: AlignLeftIcon,
  },
  {
    label: 'Align center',
    value: 'center',
    icon: AlignCenterIcon,
  },
  {
    label: 'Align right',
    value: 'right',
    icon: AlignRightIcon,
  },
  {
    label: 'Align justify',
    value: 'justify',
    icon: AlignJustifyIcon,
  },
];

const AlignmentButton = () => {
  const { editor } = useEditorStore();
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      alignment: alignemnts.find(({ value }) =>
        editor?.isActive({ textAlign: value })
      ),
    }),
  });

  const setAlignment = (alignment: string) => {
    editor?.chain().focus().setTextAlign(alignment).run();
  };

  const CurrentIcon = editorState?.alignment?.icon || AlignLeftIcon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <CurrentIcon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {alignemnts.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setAlignment(value)}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editorState?.alignment?.value === value && 'bg-neutral-200/80'
            )}
          >
            <Icon className='size-4' />
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { AlignmentButton };
