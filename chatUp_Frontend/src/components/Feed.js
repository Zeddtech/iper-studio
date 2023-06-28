import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import MasonryLayout from "./MansoryLayout";

function Feed() {
  console.log("Feed rendered ");

  const ipes = useLoaderData();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  if (ipes.length > 0) {
    return <div>{ipes && <MasonryLayout ipes={ipes} />}</div>;
  } else {
    return (
      <div className="h-[50vh]">
        {categoryId && (
          <h2 className="text-slate-600 font-semibold text-xl my-5 p-4 ">
            Results for &quot;{categoryId}&quot;
          </h2>
        )}
        <p className="text-slate-600 text-xl p-4 text-center">
          No ipe in this category
        </p>
        <p className="text-slate-600 text-base px-4 flex items-center flex-col gap-3 ">
          Try creating a new Ipe
          <button
            className="rounded py-1 px-2 hover:bg-cyan-600 border  text-white font-semibold bg-cyan-400 block"
            onClick={() => {
              navigate("/create-Ipe");
            }}
          >
            Create Ipe
          </button>
        </p>
      </div>
    );
  }
}

export default Feed;
