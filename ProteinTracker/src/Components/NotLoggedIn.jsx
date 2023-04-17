import React, { useState } from "react";
import LoginPage from "./LoginPage";

const NotLoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setLoggedIn(true);
  };

  if (loggedIn) {
    return <LoginPage />;
  }

  return (
    <div>
      <h2>Du er ikke logget inn</h2>
      <button onClick={handleLoginClick}>Logg inn</button>
      <button>Registrer deg</button>
    </div>
  );
};

export default NotLoggedIn;
