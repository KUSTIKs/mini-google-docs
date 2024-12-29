import { HTMLAttributes } from 'react';

import { FaCaretDown } from 'react-icons/fa';

type Props = {
  side: 'left' | 'right';
  shift: number;
  isActive?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const Marker = ({ side, shift, isActive, ...attrs }: Props) => {
  const translateFactor = side === 'left' ? -1 : 1;

  return (
    <div
      {...attrs}
      className='absolute top-0 w-4 h-full cursor-ew-resize z-[5]'
      style={{ [side]: shift, translate: `${50 * translateFactor}%` }}
    >
      <FaCaretDown className='h-full fill-blue-500 absolute left-1/2 -translate-x-1/2' />
      {isActive && (
        <div className='absolute top-4 left-1/2 -translate-x-1/2 h-screen w-[1px] scale-x-[0.5] bg-[#3b72f6]' />
      )}
    </div>
  );
};

export { Marker };
