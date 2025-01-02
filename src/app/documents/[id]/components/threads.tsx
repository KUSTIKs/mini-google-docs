import { useThreads } from '@liveblocks/react/suspense';
import {
  AnchoredThreads,
  FloatingComposer,
  FloatingThreads,
} from '@liveblocks/react-tiptap';
import { Editor } from '@tiptap/react';

type Props = {
  editor: Editor | null;
};

const Threads = ({ editor }: Props) => {
  const { threads } = useThreads({
    query: { resolved: false },
  });

  return (
    <>
      <div className='anchored-threads'>
        <AnchoredThreads editor={editor} threads={threads} />
      </div>
      <FloatingThreads
        editor={editor}
        threads={threads}
        className='floating-threads'
      />
      <FloatingComposer editor={editor} className='floating-composer' />
    </>
  );
};

export { Threads };
