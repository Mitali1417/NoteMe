import React from "react";
import { styles } from "../style/tailwindStyles";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.flexCenter} w-full`}>
      <div
        className={`${styles.flexBetween} fixed top-[1rem] w-[80vw] p-[0.6rem] px-[1.5rem] rounded-full bg-darkPrimary/70 box-shadow-2  text-white `}
      >
        <div className={`w-full`}>
          <h3 className={`font-semibold text-[1.5rem] `}>
            .note<span className={`text-green1 font-extrabold`}>me</span>
          </h3>
        </div>
        <div className={`w-full h-full`}>
          <input
            type="text"
            placeholder="Search"
            className={`w-full h-full p-[0.5rem] px-[1rem] outline-none bg-white text-black font-semibold rounded-full `}
          />
        </div>
        <div className={`w-full h-full flex justify-end`}>
          <button
            onClick={() => navigate("/create")}
            className={`${styles.btn1}`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
