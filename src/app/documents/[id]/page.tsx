import { Room } from './room';
import { Editor } from './components/editor';
import { Navbar } from './components/navbar';
import { Toolbar } from './components/toolbar';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const DocumentPage = async ({}: Props) => {
  return (
    <div className='min-h-screen bg-[#fafbfd]'>
      <div className='flex flex-col px-4 pt-2 gap-y-2 sticky top-0 left-0 z-10 bg-[#fafbfd] print:hidden'>
        <Navbar />
        <Toolbar />
      </div>
      <Room>
        <Editor />
      </Room>
    </div>
  );
};

export default DocumentPage;
