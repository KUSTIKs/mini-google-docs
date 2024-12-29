import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { Marker as MarkerType } from './marker';

const width = 816;
const segmentWidth = 8;
const minMarkerGap = 100;

const segmentsCount = Math.floor(width / segmentWidth);
const segments = [...Array(segmentsCount).keys()];

type MarkerType = 'left' | 'right';

const Ruller = () => {
  const [leftMargin, setLeftMargin] = useState(56);
  const [rightMargin, setRightMargin] = useState(56);
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

      const relativeX = Math.max(0, Math.min(eventX - containerX, width));

      if (activeMarker === 'left') {
        const diff = width - relativeX - rightMargin;
        if (diff < minMarkerGap) return;

        setLeftMargin(relativeX);
      } else if (activeMarker === 'right') {
        const diff = relativeX - leftMargin;
        if (diff < minMarkerGap) return;

        setRightMargin(width - relativeX);
      }
    },
    [activeMarker, leftMargin, rightMargin]
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
        className={`max-w-[816px] mx-auto w-full h-full relative`}
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
