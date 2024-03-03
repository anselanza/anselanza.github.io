import { TinaTemplate } from "tinacms";

const vimeoEmbed: TinaTemplate = {
  name: "vimeo",
  label: "Vimeo Embedded",
  fields: [
    {
      type: "string",
      label: "Video ID",
      name: "id",
    },
    {
      type: "string",
      label: "Title",
      name: "title",
    },
  ],
};

export default vimeoEmbed;
