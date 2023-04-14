import { Navigate, redirect } from "react-router-dom";
import { client } from "../sanityConfig";
import { v4 as uuidv4 } from "uuid";

export function savePin(pinId, userId, revalidate) {
  console.log("save function called ");

  client
    .patch(pinId)
    .setIfMissing({ save: [] })
    .append("save", [
      {
        _key: uuidv4(),
        userid: userId,
        savedBy: {
          _type: "postedBy",
          _ref: userId,
        },
      },
    ])
    .commit()
    .then(res => {
      console.log(res);
      revalidate();
      return res;
    })
    .catch(error => {
      throw new Error("something went wrong couldn't fetch feed");
    });
}
