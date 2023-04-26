import React, { useState } from "react";
import MainScrean from "./MainScrean";
import PresetFood from "./PresetFood";

const postAddFood = (name, totalCalories, totalProtein) => {
  fetch(
    `https://localhost:7168/addFood?tokenFromClient=${localStorage.getItem(
      "sessionToken"
    )}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        id: 0,
        kcal: Math.floor(totalCalories),
        protein: Math.floor(totalProtein),
        consumptionDateTime: new Date(Date.now()).toISOString(),
        userId: localStorage.getItem("userId"),
      }),
    }
  );
};

const AddFood = () => {
  const [name, setName] = useState("");
  const [grams, setGrams] = useState("");
  const [caloriesPer100g, setCaloriesPer100g] = useState("");
  const [proteinPer100g, setProteinPer100g] = useState("");
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [home, setHome] = useState(false);
  const [presets, setPresets] = useState(false);

  const handleTotalCaloriesChange = (e) => {
    setTotalCalories(e.target.value);
  };

  const handleTotalProteinChange = (e) => {
    setTotalProtein(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGramsChange = (e) => {
    setGrams(e.target.value);
    setTotalCalories(e.target.value * (caloriesPer100g / 100));
    setTotalProtein(e.target.value * (proteinPer100g / 100));
  };

  const handleCaloriesPer100gChange = (e) => {
    setCaloriesPer100g(e.target.value);
    setTotalCalories(grams * (e.target.value / 100));
  };

  const handleProteinPer100gChange = (e) => {
    setProteinPer100g(e.target.value);
    setTotalProtein(grams * (e.target.value / 100));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setName("");
    setGrams("");
    setCaloriesPer100g("");
    setProteinPer100g("");
    setTotalCalories(0);
    setTotalProtein(0);
    postAddFood(name, totalCalories, totalProtein);
  };

  const handleHome = () => {
    setHome(true);
  };

  const handlePresets = () => {
    setPresets(true);
  };

  if (presets) return <PresetFood />;
  if (home) return <MainScrean />;

  return (
    <>
      <form onSubmit={handleSubmit} className="form-styled">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        <div>
          <label htmlFor="grams">Grams:</label>
          <input
            type="number"
            id="grams"
            value={grams}
            onChange={handleGramsChange}
          />
        </div>

        <div>
          <label htmlFor="caloriesPer100g">Kalorier per 100g:</label>
          <input
            type="number"
            id="caloriesPer100g"
            value={caloriesPer100g}
            onChange={handleCaloriesPer100gChange}
          />
        </div>

        <div>
          <label htmlFor="proteinPer100g">Protein per 100g:</label>
          <input
            type="number"
            id="proteinPer100g"
            value={proteinPer100g}
            onChange={handleProteinPer100gChange}
          />
        </div>

        <div>
          <label htmlFor="totalCalories">Total Kalorier:</label>
          <input
            type="number"
            id="totalCalories"
            value={totalCalories}
            onChange={handleTotalCaloriesChange}
          />
        </div>

        <div>
          <label htmlFor="totalProtein">Total Protein:</label>
          <input
            type="number"
            id="totalProtein"
            value={totalProtein}
            onChange={handleTotalProteinChange}
          />
        </div>

        <button type="submit">Legg til</button>
      </form>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button onClick={handlePresets}>Presets</button>
        <button onClick={handleHome}>Hjem</button>
      </div>
    </>
  );
};

export default AddFood;
