import { useState } from "react";
import MainScrean from "./MainScrean";

const foods = [
  {
    name: "GS Protein shake",
    kcal: 114,
    protein: 24,
  },
  {
    name: "XL Protein shake C&C",
    kcal: 385,
    protein: 48,
  },
  {
    name: "Snickers HI Protein",
    kcal: 213,
    protein: 20,
  },

  {
    name: "Generic Protein bar",
    kcal: 200,
    protein: 20,
  },
  {
    name: "Dr. Oetker MIA GRANDE",
    kcal: 977,
    protein: 46,
  },
  {
    name: "YT PROTEINBAR",
    kcal: 137,
    protein: 20,
  },
  {
    name: "YT Uten sukker Sjokolade",
    kcal: 152,
    protein: 21,
  },
];

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

const PresetFood = () => {
  const [home, setHome] = useState(false);

  const handleClick = (food) => {
    postAddFood(food.name, food.kcal, food.protein);
    handleHome;
  };
  const handleHome = () => {
    setHome(true);
  };

  if (home) return <MainScrean />;
  return (
    <main>
      <button onClick={handleHome}>Hjem</button>
      {foods.map((food, i) => {
        return (
          <button
            className="PresetFood"
            key={i}
            onClick={() => handleClick(food)}
          >
            <h3>{food.name}</h3>
            <h4>Protein: {food.protein}</h4>
            <h4>Kcal: {food.kcal}</h4>
          </button>
        );
      })}
    </main>
  );
};

export default PresetFood;
