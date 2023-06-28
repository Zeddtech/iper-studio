import Masonry from "react-masonry-css";
import Ipe from "./Ipe";

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ ipes, bp }) => {
  console.log("MasonryLayout rendered ");
  console.log(ipes);
  return (
    <Masonry className="flex " breakpointCols={bp || breakpointColumnsObj}>
      {ipes?.map((ipe, i) => (
        <Ipe key={ipe._id} ipe={ipe} i={i} className="w-max" />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
