import React, { useEffect, useState } from "react";
import { styles } from "../style/tailwindStyles";
import { useNavigate } from "react-router-dom";
import Search from "../assets/search.svg";
import Add from "../assets/add.svg";
import Logout from "../assets/logout.svg";

const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > window.innerHeight / 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className={`${styles.flexCenter} w-full`}>
      <div
        className={`${
          styles.flexBetween
        } fixed z-30 top-[1rem] w-[90%] sm:w-[80%] max-w-[1440px] p-[0.6rem] px-[1.5rem] rounded-full ${
          isScrolled ? "bg-green1/10" : "bg-darkPrimary/70"
        }  backdrop-blur-3xl box-shadow-5 border-[0.1rem] border-white/10 text-white transition-all duration-500 ease-in-out `}
      >
        <div className={`w-[70%] md:w-full`}>
          <h3 className={`font-semibold text-[1.5rem]`}>
            .note<span className={`text-green1 font-extrabold`}>me</span>
          </h3>
        </div>
        <div
          className={`${styles.flexBetween} w-full h-full py-[0.3rem] px-[1rem] outline-none bg-white/10 hover:bg-blue/30 border-[0.1rem] border-transparent hover:border-white/50 text-white/50 font-semibold rounded-full transition-all duration-500 ease-in-out`}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            // placeholder="Search"
            className={`bg-transparent outline-none w-full`}
          />
          <img src={Search} className={`md:pr-[0rem] w-[2rem]`} alt="" />
        </div>
        <div className={`w-[70%] md:w-full h-full flex justify-end`}>
          <button
            onClick={() => navigate("/create")}
            className={`${styles.gradientBtn1} hidden md:flex`}
          >
            Create
          </button>
          {/* mobile create button */}
          <img
            src={Add}
            onClick={() => navigate("/create")}
            className={`bg-gradient-to-tr from-green1 to-brightGreen1 hover:bg-gradient-to-tr hover:from-green1/60 hover:to-brightGreen1/60 font-semibold rounded-full transition-all duration-500 ease-in-out flex md:hidden w-[2.5rem] h-[2.5rem]`}
            alt=""
          />
          <img
            onClick={handleLogout}
            className={`bg-black/5 hover:bg-rose-500/20 border-[0.1rem] border-white/20 hover:border-rose-500 rounded-full mx-[0.5rem] transition-all duration-500 ease-in-out w-[2.5rem] h-[2.5rem] p-[0.4rem]`}
            src={Logout}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
