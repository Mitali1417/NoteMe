import React from "react";
import AllRoutes from "./routes/AllRoutes";
import { styles } from "./style/tailwindStyles";

const App = () => {
  return (
    <div className={`${styles.boxWidth}`}>
      <AllRoutes />
    </div>
  );
};

export default App;
