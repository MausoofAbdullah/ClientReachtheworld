import React, { useState } from "react";
import { connect } from "react-redux";
import { addStory } from "./actions";

const AddStoryForm = ({ dispatch }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addStory({ title, description }));
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description"
      />
      <button type="submit">Add Story</button>
    </form>
  );
};

export default connect()(AddStoryForm);