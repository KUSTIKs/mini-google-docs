import { Navbar } from './components/navbar';
import { TemplatesGallery } from './components/templates-gallery';
import { DocumentsList } from './components/documents-list';

const HomePage = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='sticky top-0 left-0 right-0 z-10 h-16 bg-white p-4'>
        <Navbar />
      </div>
      <div>
        <TemplatesGallery />
        <DocumentsList />
      </div>
    </div>
  );
};

export default HomePage;
