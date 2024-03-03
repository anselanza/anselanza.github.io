import type { Collection } from "tinacms";
import vimeoEmbed from "../../components/blocks/vimeoEmbed";

const Project: Collection = {
  label: "Projects",
  name: "project",
  path: "content/projects",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/projects/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true,
    },
    {
      type: "image",
      name: "heroImg",
      label: "Hero Image",
    },
    {
      type: "rich-text",
      label: "Excerpt",
      name: "excerpt",
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      isBody: true,
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      description: "Tags for this project",
      list: true,
      ui: {
        component: "tags",
      },
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      templates: [vimeoEmbed],
    },
  ],
};

export default Project;
