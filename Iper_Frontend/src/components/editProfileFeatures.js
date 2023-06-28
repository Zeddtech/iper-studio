export function createFormFields(user) {
  return [
    {
      name: "bio",
      type: "text",
      initialValue: user.bio || "",
      label: "Bio",
    },
    {
      name: "location",
      type: "text",
      initialValue: user.location || "",
      label: "Location",
    },

    {
      name: "birthDay",
      type: "date",
      initialValue: user.birthDay || "",
      label: "Birth Date",
    },
    {
      name: "website",
      type: "url",
      initialValue: user.website || "",
      label: "Website",
    },
    {
      name: "instagramUrl",
      type: "url",
      initialValue: user.instagramUrl || "",
      label: "Instagram Link",
    },
    {
      name: "facebookUrl",
      type: "url",
      initialValue: user.facebookUrl || "",
      label: "Facebook Link",
    },
  ];
}

export const initialState = user => {
  return createFormFields(user).reduce(
    (acc, next) => ({ ...acc, [next.name]: next.initialValue }),
    {}
  );
};
