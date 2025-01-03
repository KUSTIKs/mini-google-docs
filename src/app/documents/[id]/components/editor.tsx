'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useLiveblocksExtension } from '@liveblocks/react-tiptap';

import { useEditorStore } from '@/store/use-editor-store';
import { editorExtensions } from '../lib/tiptap';
import { Ruller } from './ruller';
import { Threads } from './threads';
import { useStorage } from '@liveblocks/react/suspense';

const Editor = () => {
  const liveblocks = useLiveblocksExtension();
  const leftMargin = useStorage((state) => state.leftMargin);
  const rightMargin = useStorage((state) => state.rightMargin);

  const { setEditor } = useEditorStore();
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin}px; padding-right: ${rightMargin}px`,
        class: `focus:outline-none print:border-0 bg-white border\
          border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px]\
          pt-10 pr-14 pb-10 cursor-text`,
      },
    },
    extensions: [...editorExtensions, liveblocks],
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
  });

  return (
    <div className='size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:overflow-visible flex-col'>
      <Ruller />
      <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
};

export { Editor };
