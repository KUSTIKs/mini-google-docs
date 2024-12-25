import { Editor } from './components/editor';
import { Toolbar } from './components/toolbar';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const DocumentPage = async ({}: Props) => {
  return (
    <div className='min-h-screen bg-[#fafbfd]'>
      <Toolbar />
      <Editor />
    </div>
  );
};

export default DocumentPage;
