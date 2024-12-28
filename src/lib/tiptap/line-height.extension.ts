import { Extension } from '@tiptap/react';
import '@tiptap/extension-text-style';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineHeight: {
      setLineHeight: (size: string) => ReturnType;
      unsetLineHeight: () => ReturnType;
    };
  }
}

const LineHeight = Extension.create({
  name: 'lineHeight',
  addOptions: () => ({
    types: ['paragraph', 'heading'],
    defaultLineHeight: 'noraml',
  }),
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight,
            parseHTML: (element) =>
              element.style.lineHeight || this.options.defaultLineHeight,
            renderHTML({ lineHeight }) {
              if (!lineHeight) return {};
              return {
                style: `line-height: ${lineHeight}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setLineHeight: (lineHeight: string) => {
        return ({ tr, state, dispatch }) => {
          const { selection } = state;
          tr = tr.setSelection(selection);

          const { from, to } = selection;

          state.doc.nodesBetween(from, to, (node, position) => {
            if (!this.options.types.includes(node.type.name)) return;

            tr = tr.setNodeMarkup(position, undefined, {
              ...node.attrs,
              lineHeight,
            });
          });

          if (dispatch) {
            dispatch(tr);
          }

          return true;
        };
      },
      unsetLineHeight: () => {
        return ({ tr, state, dispatch }) => {
          const { selection } = state;
          tr = tr.setSelection(selection);

          const { from, to } = selection;

          state.doc.nodesBetween(from, to, (node, position) => {
            if (!this.options.types.includes(node.type.name)) return;

            tr = tr.setNodeMarkup(position, undefined, {
              ...node.attrs,
              lineHeight: this.options.defaultLineHeight,
            });
          });

          if (dispatch) {
            dispatch(tr);
          }

          return true;
        };
      },
    };
  },
});

export { LineHeight };
