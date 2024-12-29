import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between h-full w-full'>
      <div className='flex gap-3 items-center shrink-0 pr-6'>
        <Link href='/'>
          <Image src='/logo.svg' alt='logo' width={36} height={36} priority />
        </Link>
        <h3 className='text-lg'>Docs</h3>
      </div>
    </nav>
  );
};

export { Navbar };
