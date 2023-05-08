import { defer, redirect } from "react-router-dom";
import { client } from "../sanityConfig";
import {
  allFeedQuery,
  pinDetailQuery,
  searchQuery,
  similarPinCategoryQuery,
  userActivityQuery,
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "./GROQqueries";

export async function userLoader() {
  const user_id = localStorage.getItem("user_id");
  // return 1;
  console.log(" user loader ran ");
  if (user_id) {
    try {
      const userquery = userQuery(user_id);
      const res = await client.fetch(userquery);
      console.log(res);
      if (res.length < 1) {
        throw new Error("sever not responding");
      }
      return res[0];
    } catch (error) {
      throw new Error("something went wrong " + error);
    }
  } else {
    return redirect("/login");
  }
}
export async function feedLoader({ params }) {
  console.log("feedLoader ran");
  try {
    if (params.categoryId) {
      const res = await client.fetch(searchQuery(params.categoryId));
      return res;
    } else {
      const res = await client.fetch(allFeedQuery);
      console.log(res);
      return res;
    }
  } catch (error) {
    throw new Error("something went wrong, " + error);
  }
}
export async function pinDetailLoader({ params }) {
  console.log("pindetail ran");
  try {
    const pinDetail = await client.fetch(pinDetailQuery(params.PinId));
    const similarPins = client.fetch(
      similarPinCategoryQuery(pinDetail._id, pinDetail.category)
    );
    console.log(pinDetail);
    return defer({ pinDetail, similarPins });
  } catch (error) {
    throw new Error("something went wrong, " + error.message);
  }
}
export async function userProfileLoader({ params }) {
  console.log("pindetail ran");
  try {
    const user = await client.fetch(userQuery(params.userid));
    const userCreatedPins = client.fetch(userCreatedPinsQuery(params.userid));
    const userSavedPins = client.fetch(userSavedPinsQuery(params.userid));
    const userActivity = client.fetch(userActivityQuery(params.userid));
    return defer({ user, userCreatedPins, userSavedPins, userActivity });
  } catch (error) {
    throw new Error("something went wrong, " + error.message);
  }
}
