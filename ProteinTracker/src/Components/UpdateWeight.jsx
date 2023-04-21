import React, { useState } from "react";
import MainScrean from "./MainScrean";

const postUpdateWeight = (weight, comment) => {
  fetch(
    `https://localhost:7168/addWeight?tokenFromClient=${localStorage.getItem(
      "sessionToken"
    )}&weight=${weight}&coment=${comment}`,
    {
      method: "POST",
    }
  );
};

const UpdateWeight = () => {
  const [weight, setWeight] = useState("");
  const [comment, setComment] = useState("");
  const [takeMeBack, setTakeMeBack] = useState(false);

  const handleTakeMeBack = () => {
    setTakeMeBack(true);
  };

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

  if (takeMeBack) return <MainScrean />;

  return (
    <>
      <form onSubmit={handleSubmit} className="form-styled">
        <div>
          <label htmlFor="weight">Weight:</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={handleWeightChange}
            required
          />
        </div>

        <div>
          <label htmlFor="comment">Comment:</label>
          <input
            type="text"
            id="comment"
            value={comment}
            onChange={handleCommentChange}
          />
        </div>

        <button type="submit">Oppdater</button>
      </form>
      <button onClick={handleTakeMeBack}>Hjem</button>
    </>
  );
};

export default UpdateWeight;
