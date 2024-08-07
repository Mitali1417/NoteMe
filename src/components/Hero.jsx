import React from "react";
import { styles } from "../style/tailwindStyles";
import { useNavigate } from "react-router-dom";
import { userProfile } from "../utils/userProfileData";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.flexCenter} flex-col w-full background text-center`}
    >
      <p
        className={`w-full mb-[1rem] text-[2.5rem] text-white rounded-full flex items-center justify-center ml-4`}
      >
        Hi,&nbsp;
        <span className={`lowercase text-rose-500 font-bold`}>{userProfile()} :)</span>
      </p>
      <p className={``}>Note everything that you want with</p>
      <h3
        className={`font-bold leading-[5rem] text-[4rem] md:text-[5.5rem] ${styles.gradientText}`}
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
