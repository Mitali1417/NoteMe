import React from "react";
import AllRoutes from "./AllRoutes";
import { styles } from "./style/tailwindStyles";

const App = () => {
  return (
    <div className={`${styles.boxWidth}`}>
      <AllRoutes />
    </div>
  );
};

export default App;
