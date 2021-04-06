import Card from "./ScientistCard";
import { Link } from "react-router-dom";

export const ScientistsCardGrid = ({ scientists }) => {
  return (
    <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
      {scientists.map((scientist, i) => {
        return (
          <Card
            key={i}
            id={scientist.id}
            name={scientist.name}
            fields={scientist.fields}
            bio={scientist.bio}
          />
        );
      })}
      <Link to="/addScientist">
        <div className="mx-auto text-9xl max-w-sm opacity-25">
          <div className="text-center mt-12">
            <i className="fa fa-plus-square"></i>
          </div>
        </div>
      </Link>
    </div>
  );
};
// #<img width="150" src="./addnew.jpg" alt="add new scientist"></img>

export default ScientistsCardGrid;
