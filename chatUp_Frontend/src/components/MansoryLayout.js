import Masonry from "react-masonry-css";
import Pin from "./Pin";

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins, bp }) => {
  return (
    <Masonry className="flex " breakpointCols={bp || breakpointColumnsObj}>
      {pins?.map((pin, i) => (
        <Pin key={pin._id} pin={pin} i={i} className="w-max" />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
