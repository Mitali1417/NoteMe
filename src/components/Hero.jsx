import React from "react";
import { styles } from "../style/tailwindStyles";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.flexCenter} flex-col w-full background `}>
      <p>Note everything that you want with</p>
      <h3
        className={`font-bold leading-[5rem] text-[5.5rem] bg-gradient-to-tr from-green1 to-brightGreen1 text-transparent bg-clip-text `}
      >
        .note<span className={`text-white font-extrabold`}>me</span>
      </h3>
      <button
        type="button"
        onClick={() => navigate("/create")}
        className={`${styles.btn4} box-shadow-4 mt-[2rem]`}
      >
        Create Task
      </button>
    </div>
  );
};

export default Hero;
