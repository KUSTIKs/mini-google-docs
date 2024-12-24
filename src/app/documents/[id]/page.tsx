import { Editor } from './components/editor';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const DocumentPage = async ({}: Props) => {
  return (
    <div className='min-h-screen bg-[#fafbfd]'>
      <Editor />
    </div>
  );
};

export default DocumentPage;
