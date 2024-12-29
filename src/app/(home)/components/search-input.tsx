'use client';

import { ChangeEventHandler, FormEventHandler, useRef, useState } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';

import { useSearchParam } from '@/hooks/use-search-param';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SearchInput = () => {
  const [search, setSearch] = useSearchParam();
  const [value, setValue] = useState(search);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };
  const clearValue = () => {
    setValue('');
    setSearch('');
    inputRef.current?.blur();
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className='flex-1 flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='relative max-w-[720px] w-full'>
        <Input
          value={value}
          onChange={handleChange}
          ref={inputRef}
          placeholder='Search'
          className='md:text-base placeholder:text-neutral-800 px-14 w-full border-none bg-[#f0f4f8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white focus-visible:shadow-[0_1px_1px_0_#4145494d,0_1px_3px_1px_#41454926]'
        />
        <Button
          type='submit'
          variant='ghost'
          size='icon'
          className='absolute left-3 top-1/2 -translate-y-1/2 rounded-full [&_svg]:size-5'
        >
          <SearchIcon />
        </Button>
        {value && (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='absolute right-3 top-1/2 -translate-y-1/2 rounded-full [&_svg]:size-5'
            onClick={clearValue}
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  );
};

export { SearchInput };
