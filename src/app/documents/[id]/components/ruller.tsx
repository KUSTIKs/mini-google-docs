import { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation, useStorage } from '@liveblocks/react/suspense';

import { cn } from '@/lib/utils';
import { Marker as MarkerType } from './marker';
import {
  documentWidth,
  minMarginGap,
  rullerSegmentsCount,
} from '../constants/document';

const segments = [...Array(rullerSegmentsCount).keys()];

type MarkerType = 'left' | 'right';

const Ruller = () => {
  const leftMargin = useStorage((state) => state.leftMargin);
  const setLeftMargin = useMutation(({ storage }, value: number) => {
    storage.set('leftMargin', value);
  }, []);

  const rightMargin = useStorage((state) => state.rightMargin);
  const setRightMargin = useMutation(({ storage }, value: number) => {
    storage.set('rightMargin', value);
  }, []);

  const [activeMarker, setActiveMarker] = useState<MarkerType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const unsetActiveMarker = () => {
    setActiveMarker(null);
  };

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (activeMarker === null || !containerRef.current) return;

      const containerX = containerRef.current.getBoundingClientRect().x;
      const eventX = event.clientX;

      const relativeX = Math.max(
        0,
        Math.min(eventX - containerX, documentWidth)
      );

      if (activeMarker === 'left') {
        const diff = documentWidth - relativeX - rightMargin;
        if (diff < minMarginGap) return;

        setLeftMargin(relativeX);
      } else if (activeMarker === 'right') {
        const diff = relativeX - leftMargin;
        if (diff < minMarginGap) return;

        setRightMargin(documentWidth - relativeX);
      }
    },
    [activeMarker, leftMargin, rightMargin, setLeftMargin, setRightMargin]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', unsetActiveMarker);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', unsetActiveMarker);
    };
  }, [handleMouseMove]);

  return (
    <div className='h-6 border-b border-gray-300 flex items-end relative select-none print:hidden'>
      <div
        ref={containerRef}
        style={{ width: documentWidth }}
        className='mx-auto h-full relative'
      >
        <MarkerType
          side='left'
          shift={leftMargin}
          isActive={activeMarker === 'left'}
          onMouseDown={() => setActiveMarker('left')}
        />
        <div className='flex items-end  gap-x-[8px] h-full'>
          {segments.map((marker) => (
            <div key={marker} className='relative w-0'>
              {marker % 10 === 0 ? (
                <>
                  <div
                    key={marker}
                    className='w-[1px] h-2 bg-neutral-500 shrink-0'
                  />
                  <span className='absolute top-0 text-[10px] text-neutral-500 translate-x-[-50%] translate-y-[-100%]'>
                    {marker / 10 + 1}
                  </span>
                </>
              ) : (
                <div
                  key={marker}
                  className={cn(
                    'w-[1px] h-1 bg-neutral-500 shrink-0',
                    marker % 5 === 0 && 'h-1.5'
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <MarkerType
          side='right'
          shift={rightMargin}
          isActive={activeMarker === 'right'}
          onMouseDown={() => setActiveMarker('right')}
        />
      </div>
    </div>
  );
};

export { Ruller };
