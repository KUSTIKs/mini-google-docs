import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const parseString = (value: unknown): string | undefined => {
  const isString = typeof value === 'string';
  return isString ? value : undefined;
};

export { cn, parseString };
