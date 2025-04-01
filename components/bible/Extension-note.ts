import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Component from "./Notebien";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    note: {
      /**
       * Add an note
       * @param options The note attributes
       * @example editor.commands.toggleNote()
       *
       */
      setNote: () => ReturnType;
    };
  }
}

export default Node.create({
  name: "noteComponent",

  group: "block",

  content: "inline*",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addCommands() {
    return {
      setNote:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name);
        },
    };
  },

  parseHTML() {
    return [
      {
        tag: "note-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["note-component", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});
