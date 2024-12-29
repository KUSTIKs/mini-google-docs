import Link from 'next/link';
import { Navbar } from './components/navbar';

const HomePage = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='sticky top-0 left-0 right-0 z-10 h-16 bg-white p-4'>
        <Navbar />
      </div>
      <p>
        Click{' '}
        <Link href='/documents/123' className='text-blue-500 underline'>
          here
        </Link>{' '}
        to go to document id
      </p>
    </div>
  );
};

export default HomePage;
