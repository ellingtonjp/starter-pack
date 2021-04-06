import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { updateScientist, selectScientistById } from "./scientistsSlice.js";

export const EditScientistForm = ({ match }) => {
  const { scientistId } = match.params;

  const scientist = useSelector((state) =>
    selectScientistById(state, scientistId)
  );

  // useState is used -- redux doesn't need to know about form data
  const [name, setName] = useState(scientist.name);
  const [fields, setFields] = useState(scientist.fields);
  const [dob, setDob] = useState(scientist.dob);
  const [bio, setBio] = useState(scientist.bio);

  const dispatch = useDispatch();
  const history = useHistory();

  const onNameChanged = (e) => setName(e.target.value);
  const onFieldsChanged = (e) => setFields(e.target.value);
  const onDobChanged = (e) => setDob(e.target.value);
  const onBioChanged = (e) => setBio(e.target.value);

  const onUpdateScientistClicked = () => {
    if (name) {
      dispatch(updateScientist({ id: scientistId, name, fields, dob, bio }));
      history.push(`/scientist/${scientistId}`);
    }
  };

  return (
    <section>
      <h2>Update Scientist</h2>
      <form>
        <label htmlFor="scientistName">Scientist Name:</label>
        <input
          type="text"
          id="scientistName"
          name="scientistName"
          value={name}
          onChange={onNameChanged}
        />
        <label htmlFor="scientistFields">Fields:</label>
        <input
          type="text"
          id="scientistFields"
          name="scientistFields"
          value={fields}
          onChange={onFieldsChanged}
        />
        <label htmlFor="scientistDob">Date of Birth:</label>
        <input
          type="date"
          id="scientistDob"
          name="scientistDob"
          value={dob}
          onChange={onDobChanged}
        />
        <label htmlFor="scientistBio">Biography:</label>
        <textarea
          id="scientistBio"
          name="scientistBio"
          value={bio}
          onChange={onBioChanged}
        />
        <button type="button" onClick={onUpdateScientistClicked}>
          Update Scientist
        </button>
      </form>
    </section>
  );
};

export default EditScientistForm;
