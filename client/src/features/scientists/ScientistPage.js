import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { selectScientistById, deleteScientist } from "./scientistsSlice";

export const ScientistPage = ({ match }) => {
  const { scientistId } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  const scientist = useSelector((state) =>
    selectScientistById(state, scientistId)
  );

  const onDelete = () => {
    dispatch(deleteScientist(scientistId));
    history.push("/");
  };

  if (!scientist) {
    return (
      <div className="mx-auto text-5xl">
        <p className="text-center">Scientist not found</p>
      </div>
    );
  }

  return (
    <div className="ml-32 max-w-md">
      <div className="grid grid-cols-2">
        <div className="text-5xl">{scientist.name}</div>
        <div className="text-2xl">
          <i
            className="fa fa-close text-gray-300 hover:text-red-500"
            onClick={onDelete}
          ></i>
        </div>
      </div>
      <div className="mt-0 text-gray-500 italic">{scientist.fields}</div>
      <div className="mt-12">{scientist.bio}</div>
    </div>
  );
};

export default ScientistPage;
