'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useLiveblocksExtension } from '@liveblocks/react-tiptap';
import { useStorage } from '@liveblocks/react/suspense';

import { useEditorStore } from '@/store/use-editor-store';
import { Ruller } from './ruller';
import { ThreadsSuspense } from './threads';
import { editorExtensions } from '../lib/tiptap';
import { documentWidth } from '../constants/document';

type Props = {
  initialContent?: string;
};

const Editor = ({ initialContent }: Props) => {
  const liveblocks = useLiveblocksExtension({ initialContent });
  const leftMargin = useStorage((state) => state.leftMargin);
  const rightMargin = useStorage((state) => state.rightMargin);

  const { setEditor } = useEditorStore();
  const editor = useEditor({
    autofocus: true,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin}px; padding-right: ${rightMargin}px; width: ${documentWidth}px`,
        class: `focus:outline-none print:border-0 bg-white border\
          border-[#c7c7c7] flex flex-col min-h-[1054px]\
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
      <div
        style={{ width: documentWidth }}
        className='min-w-max flex justify-center py-4 print:py-0 mx-auto print:w-full print:min-w-0'
      >
        <EditorContent editor={editor} />
        <ThreadsSuspense editor={editor} />
      </div>
    </div>
  );
};

export { Editor };
