import Link from 'next/link';

const HomePage = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
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
