import { useState, useEffect } from "react";
import Loading from "./Loading";
import MainScrean from "./MainScrean";

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

const ToggleMealsAndWeights = () => {
  const [showMeals, setShowMeals] = useState(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [home, setHome] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const toggleDisplay = () => {
    setShowMeals(!showMeals);
  };

  useEffect(() => {
    getUserInfo(localStorage.getItem("sessionToken")).then((userInfo) => {
      setData(userInfo);

      setLoading(false);
    });
  }, []);

  const handleHome = () => {
    setHome(true);
  };

  if (home) return <MainScrean />;
  if (loading) return <Loading />;
  return (
    <div className="logg">
      <button onClick={handleHome}>Hjem</button>
      <button onClick={toggleDisplay}>
        {showMeals ? "Show Weights" : "Show Meals"}
      </button>

      {showMeals ? (
        <table>
          <thead>
            <tr>
              <th>Navn</th>
              <th>Kcal</th>
              <th>Protein</th>
              <th>Tidspunkt</th>
            </tr>
          </thead>
          <tbody>
            {data.meals
              .map((meal) => {
                const isToday =
                  meal.consumptionDateTime.split("T")[0] === today;
                const date = new Date(meal.consumptionDateTime);
                const displayDate = isToday
                  ? date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : date.toLocaleDateString();

                return (
                  <tr
                    key={meal.id}
                    style={{
                      fontWeight: isToday ? "bold" : "normal",
                    }}
                  >
                    <td>{meal.name}</td>
                    <td>{meal.kcal}</td>
                    <td>{meal.protein}</td>
                    <td>{displayDate}</td>
                  </tr>
                );
              })
              .reverse()}
          </tbody>
        </table>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Vekt</th>
              <th>Kommentar</th>
            </tr>
          </thead>
          <tbody>
            {data.weights
              .map((weight) => (
                <tr key={weight.id}>
                  <td>{weight.meshuredWeight}</td>
                  <td>{weight.coment}</td>
                </tr>
              ))
              .reverse()}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ToggleMealsAndWeights;
