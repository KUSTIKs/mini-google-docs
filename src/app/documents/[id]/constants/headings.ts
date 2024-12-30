import { Level } from '@tiptap/extension-heading';

type Heading = {
  fontSize: number;
  level: Level;
};

const headings: Heading[] = [
  { fontSize: 32, level: 1 },
  { fontSize: 24, level: 2 },
  { fontSize: 20, level: 3 },
  { fontSize: 18, level: 4 },
  { fontSize: 16, level: 5 },
];

export { headings };
