export const formFields = [
  { name: "title", type: "text", initialValue: "", label: "Add ipe title" },
  {
    name: "about",
    type: "text",
    initialValue: "",
    label: "About ipe",
  },
  {
    name: "destination",
    type: "url",
    initialValue: "",
    label: "ipe url link",
  },
  {
    name: "imageAsset",
    type: "image",
    initialValue: "",
    label: "Add ipe Image",
  },
  {
    name: "category",
    type: "text",
    initialValue: "",
    label: "Add ipe category",
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
