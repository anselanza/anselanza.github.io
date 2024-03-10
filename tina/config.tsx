import { defineConfig } from "tinacms";

import Post from "./collection/post";
import Global from "./collection/global";
import Author from "./collection/author";
import Page from "./collection/page";
import Project from "./collection/project";

console.log(
  "******* relevant vars:",
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  process.env.TINA_TOKEN,
  process.env.TINA_TOKEN ===
    "TINA_TOKEN=a7ae074b5898a7fa476321a72b7efc3b878862a3",
);

const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch: "main",
  token: process.env.TINA_TOKEN!,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema: {
    collections: [Project, Post, Global, Author, Page],
  },
});

export default config;
