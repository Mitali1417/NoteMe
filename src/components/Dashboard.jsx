import React, { useRef, useState, useEffect } from "react";
import { styles } from "../style/tailwindStyles";
import Menu from "../assets/menu.svg";
import Cross from "../assets/cross.svg";
import { useNavigate } from "react-router-dom";
import { getTasks, deleteTask, truncateDescription } from "../utils/task";
import Hero from "./Hero";
import { userProfile } from "../utils/userProfileData";
import ShowTask from "./ShowTask";
import Header from "./Header";

const Dashboard = () => {
  const [menu, setMenu] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("date");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const sortRef = useRef(null);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setShowSortOptions(false);
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortOrder === "date") {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });

  useEffect(() => {
    const tasks = getTasks();
    setTasks(tasks);
  }, []);

  useEffect(() => {
    const handleTaskDeleted = () => {
      const tasks = getTasks();
      setTasks(tasks);
    };

    window.addEventListener("taskDeleted", handleTaskDeleted);

    return () => {
      window.removeEventListener("taskDeleted", handleTaskDeleted);
    };
  }, []);

  const handleMenu = (e, taskId) => {
    e.stopPropagation();
    setMenu((prev) => (prev === taskId ? null : taskId));
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenu(null);
    }
    if (sortRef.current && !sortRef.current.contains(e.target)) {
      setShowSortOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShowTask = (taskId) => {
    window.dispatchEvent(new CustomEvent("showTask", { detail: taskId }));
  };

  return (
    <div className={`p-4 pt-0 overflow-hidden`}>
      <Header onSearch={handleSearch} />
      <div
        className={`${styles.background} ${
          tasks.length === 0 ? "pt-0" : "pt-[8rem]"
        } `}
      >
        <div
          className={`${styles.paddingX} flex justify-center md:justify-start flex-wrap w-full mx-auto`}
        >
          {tasks.length === 0 ? (
            <Hero />
          ) : (
            <>
              <div className={`${styles.flexBetween} w-full`}>
                <p
                  className={`w-full mb-[1rem] text-[1.9rem] text-white font-semibold flex justify-center`}
                >
                  Hi,&nbsp;
                  <span className={`lowercase ${styles.gradientText}`}>
                    {userProfile()} :)
                  </span>
                </p>
                <div className="relative" ref={sortRef}>
                  <button
                    className={`${styles.btn5}`}
                    onClick={() => setShowSortOptions(!showSortOptions)}
                  >
                    Sort
                  </button>
                  {showSortOptions && (
                    <div className="absolute right-0 mt-2 w-full bg-black/30 backdrop-blur-lg text-white border border-gray-700 transition-all duration-500 ease-in-out rounded-xl shadow-md z-20">
                      <button
                        className="block w-full px-4 py-2 text-left rounded-xl hover:bg-blue/50 transition-all duration-500 ease-in-out"
                        onClick={() => handleSort("date")}
                      >
                        By Date
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-left rounded-xl hover:bg-blue/50 transition-all duration-500 ease-in-out"
                        onClick={() => handleSort("title")}
                      >
                        By Title
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleShowTask(task.id)}
                    className={` ${styles.card1} flex-auto relative box-shadow-3 w-[100%] sm:w-[45%] xl:w-[30%] h-[11rem] m-2`}
                  >
                    <div className={`${styles.flexBetween} relative`}>
                      <h4 className="text-[1.4rem] text-white/50 font-medium truncate">
                        {task.title}
                      </h4>
                      {menu === task.id ? (
                        <img
                          src={Cross}
                          className="w-[1.6rem] z-10 transition-all duration-500 ease-in-out"
                          onClick={(e) => handleMenu(e, task.id)}
                          alt="cross"
                        />
                      ) : (
                        <img
                          src={Menu}
                          className="w-[1.5rem] z-10 transition-all duration-500 ease-in-out"
                          onClick={(e) => handleMenu(e, task.id)}
                          alt="menu"
                        />
                      )}
                      <div
                        ref={menuRef}
                        className={`${
                          styles.flexCenter
                        } flex-col bg-green1/15 box-shadow-2 backdrop-blur-lg w-fit absolute -right-[0.5rem] -top-[0.4rem] transition-all duration-500 ease-in-out rounded-lg p-[1rem] z-10 ${
                          menu === task.id
                            ? " opacity-100 visible"
                            : " opacity-0 invisible"
                        }`}
                      >
                        <button
                          type="button"
                          className={`${styles.flexCenter} w-full m-[0.1rem] hover:text-brightGreen1`}
                          onClick={() => handleShowTask(task.id)}
                        >
                          Open
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/edit/${task.id}`)}
                          className={`${styles.btn2} w-full m-[0.1rem]`}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteTask(task.id);
                            setTasks(getTasks());
                          }}
                          className={`${styles.deleteBtn} flex justify-center w-full  m-[0.1rem]`}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className={`my-[0.7rem] truncate-line`}>
                      {truncateDescription(task.description, 60)}
                    </p>
                    <p
                      className={`text-white/20 text-[0.8rem] absolute bottom-[1rem] right-6`}
                    >
                      {task.date}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-center text-[1.5rem] h-full w-full my-auto">
                  No tasks found
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <ShowTask />
    </div>
  );
};

export default Dashboard;
