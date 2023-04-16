import Spinner from "./Spinner";
import { useLoaderData, useRevalidator } from "react-router-dom";
import MasonryLayout from "./MansoryLayout";

function Feed() {
  const pins = useLoaderData();
  const revalidator = useRevalidator();

  if (revalidator.state == "loading") {
    return (
      <Spinner message={"Adding new fun Pipes to your feed, dont leave!! "} />
    );
  }

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
}

export default Feed;
