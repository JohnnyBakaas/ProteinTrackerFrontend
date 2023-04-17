import React, { useState } from "react";
const token = localStorage.getItem("sessionToken");
const postUpdateWeight = (weight, comment) => {
  fetch(
    `https://localhost:7168/addWeight?tokenFromClient=${token}&weight=${weight}&coment=${comment}`,
    {
      method: "POST",
    }
  );
};

const UpdateWeight = () => {
  const [weight, setWeight] = useState("");
  const [comment, setComment] = useState("");

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postUpdateWeight(weight, comment);
    setWeight("");
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="weight">Weight:</label>
      <input
        type="number"
        id="weight"
        value={weight}
        onChange={handleWeightChange}
        required
      />

      <label htmlFor="comment">Comment:</label>
      <input
        type="text"
        id="comment"
        value={comment}
        onChange={handleCommentChange}
      />

      <button type="submit">Update weight</button>
    </form>
  );
};

export default UpdateWeight;
