'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import ImageResize from 'tiptap-extension-resize-image';

import { useEditorStore } from '@/store/use-editor-store';

const extensions = [
  StarterKit,
  Underline,
  FontFamily,
  TextStyle,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  ImageResize,
];

const Editor = () => {
  const { setEditor } = useEditorStore();
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style: 'padding-inline: 56px',
        class: `focus:outline-none print:border-0 bg-white border\
          border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px]\
          pt-10 pr-14 pb-10 cursor-text`,
      },
    },
    extensions,
    content: '<p>Hello, World! 🌍</p>',
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
  });

  return (
    <div className='size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:overflow-visible flex-col'>
      <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export { Editor };
