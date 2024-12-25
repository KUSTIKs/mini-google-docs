'use client';

import { Fragment } from 'react';
import { useEditorState } from '@tiptap/react';
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from 'lucide-react';

import { useEditorStore } from '@/store/use-editor-store';
import { Separator } from '@/components/ui/separator';
import { ToolbarButton } from './toolbar-button';

type Action = {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive: boolean;
};

type ActionGroup = Action[];

const Toolbar = () => {
  const { editor } = useEditorStore();
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: !!editor?.isActive('bold'),
      isItalic: !!editor?.isActive('italic'),
      isUnderline: !!editor?.isActive('underline'),
      isTaskList: !!editor?.isActive('taskList'),
    }),
  });

  const actionGroups: ActionGroup[] = [
    [
      {
        label: 'Undo',
        icon: Undo2Icon,
        isActive: false,
        onClick() {
          editor?.chain().focus().undo().run();
        },
      },
      {
        label: 'Redo',
        icon: Redo2Icon,
        isActive: false,
        onClick() {
          editor?.chain().focus().redo().run();
        },
      },
      {
        label: 'Print',
        icon: PrinterIcon,
        isActive: false,
        onClick() {
          window.print();
        },
      },
      {
        label: 'Spell Check',
        icon: SpellCheckIcon,
        isActive: false,
        onClick() {
          const currentValue = editor?.view.dom.getAttribute('spellcheck');
          const newValue = String(currentValue !== 'true');

          editor?.view.dom.setAttribute('spellcheck', newValue);
        },
      },
    ],
    [
      {
        label: 'Bold',
        icon: BoldIcon,
        isActive: !!editorState?.isBold,
        onClick() {
          editor?.chain().focus().toggleBold().run();
        },
      },
      {
        label: 'Italic',
        icon: ItalicIcon,
        isActive: !!editorState?.isItalic,
        onClick() {
          editor?.chain().focus().toggleItalic().run();
        },
      },
      {
        label: 'Underline',
        icon: UnderlineIcon,
        isActive: !!editorState?.isUnderline,
        onClick() {
          editor?.chain().focus().toggleUnderline().run();
        },
      },
    ],
    [
      {
        label: 'Comment',
        icon: MessageSquarePlusIcon,
        isActive: false,
        onClick() {},
      },
      {
        label: 'List Todo',
        icon: ListTodoIcon,
        isActive: !!editorState?.isTaskList,
        onClick() {
          editor?.chain().focus().toggleTaskList().run();
        },
      },
      {
        label: 'Remove Formatting',
        icon: RemoveFormattingIcon,
        isActive: false,
        onClick() {
          editor?.chain().focus().unsetAllMarks().run();
        },
      },
    ],
  ];

  return (
    <div className='bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
      {actionGroups.map((group, index) => {
        const isLast = index === actionGroups.length - 1;

        return (
          <Fragment key={index}>
            {group.map((action) => (
              <ToolbarButton
                key={action.label}
                icon={action.icon}
                isActive={action.isActive}
                onClick={action.onClick}
              />
            ))}
            {!isLast && (
              <Separator
                orientation='vertical'
                className='h-6 bg-neutral-300'
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export { Toolbar };
