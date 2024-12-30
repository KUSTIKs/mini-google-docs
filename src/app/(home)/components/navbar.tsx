import Image from 'next/image';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

import { SearchInput } from './search-input';

const Navbar = () => {
  return (
    <nav className='flex gap-6 items-center h-full w-full'>
      <div className='flex flex-1 gap-3 items-center shrink-0'>
        <Link href='/'>
          <Image src='/logo.svg' alt='logo' width={36} height={36} priority />
        </Link>
        <h3 className='text-lg'>Docs</h3>
      </div>
      <SearchInput />
      <div className='flex-1 flex justify-end'>
        <UserButton />
      </div>
    </nav>
  );
};

export { Navbar };
