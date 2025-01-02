import { StarterKit } from '@tiptap/starter-kit';
import { Link } from '@tiptap/extension-link';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { FontFamily } from '@tiptap/extension-font-family';
import { TextStyle } from '@tiptap/extension-text-style';
import { TaskItem } from '@tiptap/extension-task-item';
import { TaskList } from '@tiptap/extension-task-list';
import { Table } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';
import { ImageResize } from 'tiptap-extension-resize-image';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';

import { FontSize } from '@/lib/tiptap/font-size.extension';
import { LineHeight } from '@/lib/tiptap/line-height.extension';

const editorExtensions = [
  StarterKit.configure({
    history: false,
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: 'https',
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Underline,
  FontFamily,
  TextStyle,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  ImageResize,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  FontSize,
  LineHeight.configure({
    types: ['heading', 'paragraph'],
    defaultLineHeight: 'normal',
  }),
];

export { editorExtensions };
