// Skriv om hele driten, start med backenden og jobb fram over, ingenting fungerer som vi vill
// C# endre updateUser til at den ikke oppdaterer brukernavn og kjønn
// Dette shitshowet må hente data om kcalDelta og rendre når siden åpnes.
// og hjem knappen fungerer ikke
// Lykke til!

import React, { useState } from "react";

const userId = localStorage.getItem("userId");

const postUpdateUser = (kcalDelta, token) => {
  fetch(`https://localhost:7168/updateUser?${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: "",
      id: userId,
      kcalDelta,
      gender: "",
      meals: [],
      weights: [],
    }),
  });
};

const UpdateUser = () => {
  const [kcalGoal, setKcalGoal] = useState("");
  const [showKcalInput, setShowKcalInput] = useState(false);
  const [kcalDelta, setKcalDelta] = useState(0);

  const handleKcalGoalChange = (e) => {
    setKcalGoal(e.target.value);
    setShowKcalInput(e.target.value === "cut" || e.target.value === "bulk");
    setKcalDelta(0);
  };

  const handleKcalDeltaChange = (e) => {
    const delta = parseInt(e.target.value);
    setKcalDelta(kcalGoal === "cut" ? -delta : delta);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("sessionToken");
    postUpdateUser(kcalDelta, token);
    setKcalGoal("");
    setShowKcalInput(false);
    setKcalDelta(0);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="kcalGoal">Kcal Goal:</label>
        <select
          id="kcalGoal"
          value={kcalGoal}
          onChange={handleKcalGoalChange}
          required
        >
          <option value="">Select Goal</option>
          <option value="cut">Cut</option>
          <option value="bulk">Bulk</option>
          <option value="maintain">Maintain</option>
        </select>

        {showKcalInput && (
          <>
            <label htmlFor="kcalDelta">Kcal Delta:</label>
            <input
              type="number"
              id="kcalDelta"
              value={kcalDelta}
              onChange={handleKcalDeltaChange}
              required
            />
          </>
        )}

        <button type="submit">Update user</button>
      </form>
      <button onClick={() => <MainScreen />}>Go to Main Screen</button>
    </>
  );
};

export default UpdateUser;
