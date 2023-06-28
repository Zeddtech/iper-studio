import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
export const client = createClient({
  projectId: process.env.REACT_APP_SAINITY_PROJECT_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-04-09",
  token: process.env.REACT_APP_SAINITY_TOKEN,
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = source => builder.image(source);
