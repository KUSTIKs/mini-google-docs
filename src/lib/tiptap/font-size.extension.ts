import { Extension } from '@tiptap/react';
import '@tiptap/extension-text-style';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

const FontSize = Extension.create({
  name: 'fontSize',
  addOptions: () => ({
    types: ['textStyle'],
  }),
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize,
            renderHTML({ fontSize }) {
              if (!fontSize) return {};
              return {
                style: `font-size: ${fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands: () => ({
    setFontSize: (fontSize: string) => {
      return ({ chain }) => chain().setMark('textStyle', { fontSize }).run();
    },
    unsetFontSize: () => {
      return ({ chain }) =>
        chain()
          .setMark('textStyle', { fontSize: null })
          .removeEmptyTextStyle()
          .run();
    },
  }),
});

export { FontSize };
