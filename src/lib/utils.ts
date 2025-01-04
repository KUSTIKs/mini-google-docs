import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const parseString = (value: unknown): string | undefined => {
  const isString = typeof value === 'string';
  return isString ? value : undefined;
};

const colorForString = (value: string) => {
  const nameNumber = [...value].reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );
  const hue = nameNumber % 360;
  const color = `hsl(${hue}, 80%, 60%)`;

  return color;
};

export { cn, parseString, colorForString };
