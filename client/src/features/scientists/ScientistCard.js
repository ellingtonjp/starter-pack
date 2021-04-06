import { Link } from "react-router-dom";

export const ScientistCard = ({ id, name, fields, bio }) => {
  const trimmedBio = bio.length > 100 ? bio.substring(0, 100) + "..." : bio;
  return (
    <Link to={`/scientist/${id}`}>
      <div className="relative hover:bg-gray-50 p-6 h-60 max-w-sm mx-5 bg-white border rounded-xl shadow-xl flex space-x-4">
        <div>
          <div id="test" className="text-3xl font-medium text-black">
            {name}
          </div>
          <div className="h-2">
            <label htmlFor="test" className="text-xs text-gray-500">
              <i>{fields}</i>
            </label>
          </div>
          <div className="pt-6 text-sm text-gray-500">
            <p>{trimmedBio}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ScientistCard;
