import { create } from 'zustand';
import { Editor } from '@tiptap/react';

type EditorState = {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
};

const useEditorStore = create<EditorState>((set) => ({
  editor: null,
  setEditor(editor) {
    set({ editor });
  },
}));

export type { EditorState };
export { useEditorStore };
