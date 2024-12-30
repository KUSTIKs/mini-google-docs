'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { templates } from '../constants/templates';

const TemplatesGallery = () => {
  const isCreating = false;

  return (
    <div className='bg-[#f1f3f4]'>
      <div className='max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4'>
        <h3 className='text-medium'>Start a new document</h3>
        <Carousel>
          <CarouselContent className='-ml-4'>
            {templates.map(({ id, label, imageSrc }) => (
              <CarouselItem
                key={id}
                className='basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[calc(100%/7)] pl-4'
              >
                <div
                  className={cn(
                    'flex flex-col gap-y-2.5',
                    isCreating && 'pointer-events-none opacity-50'
                  )}
                >
                  <button
                    disabled={isCreating}
                    onClick={() => {}}
                    className='relative hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white aspect-[3/4] overflow-hidden'
                  >
                    <Image
                      src={imageSrc}
                      alt='Template preview'
                      fill
                      className='object-cover'
                    />
                  </button>
                  <p className='text-sm font-medium truncate'>{label}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export { TemplatesGallery };
