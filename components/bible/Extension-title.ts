import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Component from "./TitleComponent";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    title: {
      /**
       * Add an title
       * @param options The title attributes
       * @example editor.commands.toggleTitle()
       *
       */
      setTitle: () => ReturnType;
    };
  }
}

export default Node.create({
  name: "titleComponent",

  group: "block",

  content: "inline*",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addCommands() {
    return {
      setTitle:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name);
        },
    };
  },

  parseHTML() {
    return [
      {
        tag: "title-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "title-component",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});
