/* eslint-disable no-unused-vars */
import { Navigate, redirect } from "react-router-dom";
import { client } from "../sanityConfig";
import { v4 as uuidv4 } from "uuid";

export function savePin(
  pinId,
  userId,
  setSavedLength,
  setSavingPost,
  setsavedPost
) {
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
      setSavedLength(res.save.length);
      setSavingPost(false);
      setsavedPost(true);
      //   revalidate();
      return res;
    })
    .catch(error => {
      throw new Error("something went wrong couldn't fetch feed");
    });
}
export function deletePin(pinId, setIsDeleted) {
  client
    .delete(pinId)
    .then(res => {
      console.log("pipe deleted", res);
      if (pinId == res.documentIds[0]) {
        setIsDeleted(true);
      }
    })
    .catch(err => {
      console.error("Delete failed: ", err.message);
    });
}
export async function saveComment(userId, pinId, comment) {
  const res = await client
    .patch(pinId)
    .setIfMissing({ comments: [] })
    .prepend("comments", [
      {
        _key: uuidv4(),
        comment,
        date: new Date().toISOString(),
        postedBy: {
          _type: "postedBy",
          _ref: userId,
        },
      },
    ])
    .commit();

  console.log(res);
  return res;
}
