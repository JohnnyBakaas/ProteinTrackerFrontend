import { useState, useEffect } from "react";
import AddFood from "./AddFood";
import Loading from "./Loading";
import UpdateWeight from "./UpdateWeight";
import UpdateUser from "./UpdateUser";

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

const calculateCalories = (user) => {
  const waight = user.weights[user.weights.length - 1].meshuredWeight;
  const caloriePerKgMale = 30;
  const caloriePerKgFemale = 27;
  if (user.gender == "male") return waight * caloriePerKgMale + user.kcalDelta;
  return waight * caloriePerKgFemale + user.kcalDelta;
};

const calculateProteins = (user) => {
  const waight = user.weights[user.weights.length - 1].meshuredWeight;
  const proteinPerKgMale = 2.2;
  const proteinPerKgFemale = 1.4;
  if (user.gender == "male") return Math.floor(waight * proteinPerKgMale);
  return Math.floor(waight * proteinPerKgFemale);
};

const MainScrean = () => {
  const [user, setUser] = useState();

  const [todaysProtein, setTodaysProtein] = useState(0);
  const [proteinGoal, setProteinGoal] = useState(0);

  const [todaysCalories, setTodaysCalories] = useState(0);
  const [caloriesGoal, setCaloriesGoal] = useState(0);

  const [loading, setLoading] = useState(true);

  const [showAddFood, setShowAddFood] = useState(false);
  const [showUpdateWaight, setShowUpdateWaight] = useState(false);
  const [showUpdateOptions, setShowUpdateOptions] = useState(false);

  const handleAddFoodClick = () => {
    setShowAddFood(true);
  };

  const handleUpdateWaight = () => {
    setShowUpdateWaight(true);
  };

  const handleUpdateOptions = () => {
    setShowUpdateOptions(true);
  };

  useEffect(() => {
    getUserInfo(localStorage.getItem("sessionToken")).then((userInfo) => {
      setUser(userInfo);
      setProteinGoal(calculateProteins(userInfo));
      setCaloriesGoal(calculateCalories(userInfo));

      const todaysMeals = userInfo.meals.filter((meal) => {
        const mealDate = new Date(meal.consumptionDateTime);
        const now = new Date();
        return (
          mealDate.getFullYear() === now.getFullYear() &&
          mealDate.getMonth() === now.getMonth() &&
          mealDate.getDate() === now.getDate()
        );
      });

      const totalProtein = todaysMeals.reduce(
        (partialSum, meal) => partialSum + meal.protein,
        0
      );
      setTodaysProtein(totalProtein);

      const totalCalories = todaysMeals.reduce(
        (partialSum, meal) => partialSum + meal.kcal,
        0
      );
      setTodaysCalories(totalCalories);

      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;
  if (showAddFood) return <AddFood />;
  if (showUpdateWaight) return <UpdateWeight />;
  if (showUpdateOptions) return <UpdateUser />;
  return (
    <main>
      <section>
        <h1>
          {todaysProtein}/{proteinGoal}
        </h1>
        <h3>protein</h3>
        <h2>
          {todaysCalories}/{caloriesGoal}
        </h2>
        <h3>kalorier</h3>
      </section>
      <section>
        <button onClick={handleAddFoodClick}>Legg til mat</button>
      </section>
      <section>
        <button onClick={handleUpdateWaight}>Oppdater vekt</button>
      </section>
      <section>
        <button>Logg</button>
      </section>
      <section>
        <button onClick={handleUpdateOptions}>Innstilinger</button>
      </section>
    </main>
  );
};

export default MainScrean;
