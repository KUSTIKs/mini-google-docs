import { UndoButton } from './undo-button';
import { RedoButton } from './redo-button';
import { PrintButton } from './print-button';
import { SpellCheckButton } from './spell-check-button';
import { BoldButton } from './bold-button';
import { ItalicButton } from './italic-button';
import { UnderlineButton } from './underline-button';
import { CommentButton } from './comment-button';
import { ListTodoButton } from './list-todo-button';
import { RemoveFormattingButton } from './remove-formatting-button';
import { FontFamilySelect } from './font-family-select';
import { HeadingSelect } from './heading-select';
import { TextColorButton } from './text-color-button';
import { HightlightColorButton } from './highlight-color-button';
import { LinkButton } from './link-button';
import { ImageButton } from './image-button';
import { AlignmentButton } from './alignment-button';
import { ListButton } from './list-button';

const Tool = {
  Undo: UndoButton,
  Redo: RedoButton,
  Print: PrintButton,
  SpellCheck: SpellCheckButton,
  Bold: BoldButton,
  Italic: ItalicButton,
  Underline: UnderlineButton,
  Comment: CommentButton,
  ListTodo: ListTodoButton,
  RemoveFormatting: RemoveFormattingButton,
  FontFamily: FontFamilySelect,
  Heading: HeadingSelect,
  TextColor: TextColorButton,
  HightlightColor: HightlightColorButton,
  Link: LinkButton,
  Image: ImageButton,
  Alignment: AlignmentButton,
  List: ListButton,
};

export { Tool };
