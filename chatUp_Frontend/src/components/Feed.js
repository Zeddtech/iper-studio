import { useLoaderData } from "react-router-dom";
import MasonryLayout from "./MansoryLayout";

function Feed() {
  const pins = useLoaderData();

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
}

export default Feed;
