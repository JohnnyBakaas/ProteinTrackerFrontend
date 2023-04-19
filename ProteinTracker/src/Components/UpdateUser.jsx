// Skriv om hele driten, start med backenden og jobb fram over, ingenting fungerer som vi vill
// C# endre updateUser til at den ikke oppdaterer brukernavn og kjønn
// Dette shitshowet må hente data om kcalDelta og rendre når siden åpnes.
// og hjem knappen fungerer ikke
// Lykke til!

import React, { useState } from "react";
import MainScrean from "./MainScrean";

const postUpdateUser = (kcalDelta, token) => {
  fetch(`https://localhost:7168/updateUser?${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: "",
      id: localStorage.getItem("userId"),
      kcalDelta,
      gender: "",
      meals: [],
      weights: [],
    }),
  });
};

const UpdateUser = () => {
  const [takeMeBack, setTakeMeBack] = useState(false);
  const handleTakeMeBack = () => {
    setTakeMeBack(true);
  };

  const handleKcalGoalChange = () => {};
  const handleSubmit = () => {};
  var kcalGoal;

  if (takeMeBack) return <MainScrean />;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Kcal Goal:</legend>
          <div onChange={handleKcalGoalChange} required>
            <input
              type="radio"
              id="cut"
              name="kcalGoal"
              value="cut"
              checked={kcalGoal === "cut"}
              onChange={() => {}}
            />
            <label htmlFor="cut">Cut</label>

            <input
              type="radio"
              id="maintain"
              name="kcalGoal"
              value="maintain"
              checked={kcalGoal === "maintain"}
              onChange={() => {}}
            />
            <label htmlFor="maintain">Maintain</label>

            <input
              type="radio"
              id="bulk"
              name="kcalGoal"
              value="bulk"
              checked={kcalGoal === "bulk"}
              onChange={() => {}}
            />
            <label htmlFor="bulk">Bulk</label>
          </div>
        </fieldset>

        <button type="submit">Oppdater</button>
      </form>

      <button onClick={handleTakeMeBack}>Hjem</button>
    </>
  );
};

export default UpdateUser;
