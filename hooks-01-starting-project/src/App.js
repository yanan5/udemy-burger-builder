import React, { useContext } from "react";
import { AuthContext } from "./components/context/auth-context";
import Auth from "./components/Auth";

import Ingredients from "./components/Ingredients/Ingredients";

const App = (props) => {
  const authContext = useContext(AuthContext);
  return authContext.isLoggedIn ? <Ingredients /> : <Auth />;
};

export default App;
