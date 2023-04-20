// Skriv om hele driten, start med backenden og jobb fram over, ingenting fungerer som vi vill
// C# endre updateUser til at den ikke oppdaterer brukernavn og kjønn
// Dette shitshowet må hente data om kcalDelta og rendre når siden åpnes.
// og hjem knappen fungerer ikke
// Lykke til!

import { useState, useEffect } from "react";
import MainScrean from "./MainScrean";
import Loading from "./Loading";

const postUpdateUser = (kcalDelta) => {
  fetch(
    `https://localhost:7168/updateUser?token=${localStorage.getItem(
      "sessionToken"
    )}&KcalDelta=${kcalDelta}`,
    {
      method: "POST",
    }
  );
};

const getUserInfo = (token) => {
  return fetch(`https://localhost:7168/user?tokenFromClient=${token}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((user) => {
      localStorage.setItem("userId", user.value.id);
      return user.value;
    });
};

const UpdateUser = () => {
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState();
  const [kcal, setKcal] = useState(0);

  useEffect(() => {
    getUserInfo(localStorage.getItem("sessionToken")).then((user) => {
      if (user.kcalDelta == 0) setMode("maintain");
      if (user.kcalDelta > 0) {
        setMode("bulk");
        setKcal(user.kcalDelta);
      }
      if (user.kcalDelta < 0) {
        setMode("cut");
        setKcal(user.kcalDelta * -1);
      }

      setLoading(false);
    });
  }, []);

  const [takeMeBack, setTakeMeBack] = useState(false);
  const handleTakeMeBack = () => {
    setTakeMeBack(true);
  };

  const handleKcalGoalChange = () => {};
  const handleSubmit = () => {
    if (mode == "cut") postUpdateUser(kcal * -1);
    if (mode == "maintain") postUpdateUser(0);
    if (mode == "bulk") postUpdateUser(kcal);
  };

  const handleKcalChange = (e) => {
    setKcal(e.target.value);
  };

  if (loading) return <Loading />;
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
              checked={mode === "cut"}
              onChange={() => {
                setMode("cut");
              }}
            />
            <label htmlFor="cut">Cut</label>

            <input
              type="radio"
              id="maintain"
              name="kcalGoal"
              value="maintain"
              checked={mode === "maintain"}
              onChange={() => {
                setMode("maintain");
              }}
            />
            <label htmlFor="maintain">Maintain</label>

            <input
              type="radio"
              id="bulk"
              name="kcalGoal"
              value="bulk"
              checked={mode === "bulk"}
              onChange={() => {
                setMode("bulk");
              }}
            />
            <label htmlFor="bulk">Bulk</label>
          </div>
          {mode == "maintain" ? (
            ""
          ) : (
            <div>
              <input
                type="number"
                id="grams"
                value={kcal}
                onChange={handleKcalChange}
                required
              />
            </div>
          )}
        </fieldset>

        <button type="submit">Oppdater</button>
      </form>

      <button onClick={handleTakeMeBack}>Hjem</button>
    </>
  );
};

export default UpdateUser;
