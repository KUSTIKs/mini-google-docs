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
import { FontFamilySelect } from './font-family-button';

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
};

export { Tool };
