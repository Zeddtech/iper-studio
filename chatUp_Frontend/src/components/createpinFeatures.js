export const formFields = [
  { name: "title", type: "text", initialValue: "", label: "Add pipe title" },
  {
    name: "about",
    type: "text",
    initialValue: "",
    label: "About pipe",
  },
  {
    name: "destination",
    type: "url",
    initialValue: "",
    label: "pipe url link",
  },
  {
    name: "imageAsset",
    type: "image",
    initialValue: "",
    label: "Add Pipe Image",
  },
  {
    name: "category",
    type: "text",
    initialValue: "",
    label: "Add pipe category",
  },
];

export const initalState = formFields.reduce(
  (acc, next) => ({ ...acc, [next.name]: next.initialValue }),
  {}
);
export const imageFormat = [
  "image/png",
  "image/svg",
  "image/jpeg",
  "image/gif",
  "image/tiff",
  ".jpg",
  ".jpeg",
  ".svg",
  ".gif",
  ".png",
  ".tiff",
];
