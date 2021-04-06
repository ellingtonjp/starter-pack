import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNewScientist } from "./scientistsSlice.js";

export const AddScientistFormOld = () => {
  // useState is used -- redux doesn't need to know about form data
  const [name, setName] = useState("");
  const [fields, setFields] = useState("");
  const [dob, setDob] = useState("");
  const [bio, setBio] = useState("");

  const dispatch = useDispatch();

  const onNameChanged = (e) => setName(e.target.value);
  const onFieldsChanged = (e) => setFields(e.target.value);
  const onDobChanged = (e) => setDob(e.target.value);
  const onBioChanged = (e) => setBio(e.target.value);

  const onSaveScientistClicked = () => {
    if (name) {
      dispatch(addNewScientist({ name, fields, dob, bio }));
      setName("");
      setFields("");
      setDob("");
      setBio("");
    }
  };

  return (
    <section>
      <h2>Add a Scientist</h2>
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
        <button type="button" onClick={onSaveScientistClicked}>
          Save Scientist
        </button>
      </form>
    </section>
  );
};

export const AddScientistForm = () => {
  // useState is used -- redux doesn't need to know about form data
  const [name, setName] = useState("");
  const [fields, setFields] = useState("");
  const [dob, setDob] = useState("");
  const [bio, setBio] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const onNameChanged = (e) => setName(e.target.value);
  const onFieldsChanged = (e) => setFields(e.target.value);
  const onDobChanged = (e) => setDob(e.target.value);
  const onBioChanged = (e) => setBio(e.target.value);

  const onSaveScientistClicked = () => {
    if (name) {
      dispatch(addNewScientist({ name, fields, dob, bio }));
      setName("");
      setFields("");
      setDob("");
      setBio("");
      history.push("/");
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Carl Friedrich Gauss"
            value={name}
            onChange={onNameChanged}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fields"
          >
            Fields
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fields"
            type="text"
            placeholder="Computer Science, Physics, Chemistry"
            value={fields}
            onChange={onFieldsChanged}
          />
        </div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="scientistDob"
        >
          Date of Birth:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="date"
          id="scientistDob"
          name="scientistDob"
          value={dob}
          onChange={onDobChanged}
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="scientistBio"
        >
          Biography:
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="scientistBio"
          name="scientistBio"
          placeholder="Johann Carl Friedrich Gauss was a German mathematician and physicist who made significant contributions to many fields in mathematics and science."
          rows="6"
          value={bio}
          onChange={onBioChanged}
        />
        <div className="flex items-center justify-between">
          <button
            onClick={onSaveScientistClicked}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScientistForm;
