import { defer, redirect } from "react-router-dom";
import { client } from "../sanityConfig";
import {
  allFeedQuery,
  ipeDetailQuery,
  searchQuery,
  similarIpeCategoryQuery,
  userActivityQuery,
  userCreatedIpesQuery,
  userQuery,
  userSavedIpesQuery,
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
export async function searchLoader({ request }) {
  console.log("search ran");
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");

  try {
    if (searchTerm && searchTerm.length > 2) {
      const res = await client.fetch(searchQuery(searchTerm));
      console.log(res);
      return res;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("something went wrong, " + error);
  }
}
export async function ipeDetailLoader({ params }) {
  console.log("ipedetail ran");
  try {
    const ipeDetail = await client.fetch(ipeDetailQuery(params.IpeId));
    const similarIpes = client.fetch(
      similarIpeCategoryQuery(ipeDetail._id, ipeDetail.category)
    );
    console.log(ipeDetail);
    return defer({ ipeDetail, similarIpes });
  } catch (error) {
    throw new Error("something went wrong, " + error.message);
  }
}
export async function userProfileLoader({ params }) {
  console.log("user profile loader ran");
  try {
    const user = await client.fetch(userQuery(params.userid));
    const userCreatedIpes = client.fetch(userCreatedIpesQuery(params.userid));
    const userSavedIpes = client.fetch(userSavedIpesQuery(params.userid));
    const userActivity = client.fetch(userActivityQuery(params.userid));
    return defer({ user, userCreatedIpes, userSavedIpes, userActivity });
  } catch (error) {
    throw new Error("something went wrong, " + error.message);
  }
}
