import { useGcontex } from "../hooks/ContextProvider";
import { client } from "../sanityConfig";
import { userQuery } from "./data";

async function userLoader() {
  const user_id = localStorage.getItem("user_id");
  // return 1;
  console.log("loader ran ");
  if (user_id) {
    try {
      const userquery = userQuery(user_id);
      const res = await client.fetch(userquery);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("user not logged in ");
  }
}
export default userLoader;
