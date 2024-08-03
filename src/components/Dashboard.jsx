import React, { useRef, useState, useEffect } from "react";
import { styles } from "../style/tailwindStyles";
import Menu from "../assets/menu.svg";
import Cross from "../assets/cross.svg";
import UpArrow from "../assets/up-arrow.svg";
import Delete from "../assets/delete.svg";
import { useNavigate } from "react-router-dom";
import { getTasks, deleteTask } from "../utils/task";
import ShowTask from "./ShowTask";

const Dashboard = () => {
  const [menu, setMenu] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const menuRef = useRef(null);

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

  const handleMenu = (taskId) => {
    setMenu((prev) => (prev === taskId ? null : taskId));
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const handleShowTask = (taskId) => {
  //   const event = new CustomEvent("showTask", { detail: taskId });
  //   window.dispatchEvent(event);
  // };

  const truncateDescription = (description, maxLength) => {
    return description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;
  };

  return (
    <div className={`p-[1rem] pt-0 overflow-hidden `}>
      <div className={`${styles.background} pt-[10rem]`}>
        <div
          className={`${styles.paddingX} flex justify-start flex-wrap w-full`}
        >
          {tasks.map((task) => (
            <div
              key={task.id}
              // onClick={() => handleShowTask(task.id)}
              className={` ${styles.card1} box-shadow-3 w-[30%] h-[10rem]`}
            >
              <div className={`${styles.flexBetween} relative`}>
                <h4 className="text-[1.4rem] text-white/50 font-medium truncate">
                  {task.title}
                </h4>
                {menu === task.id ? (
                  <img
                    src={Cross}
                    className="w-[1.6rem] z-20 transition-all duration-500 ease-in-out"
                    onClick={() => handleMenu(task.id)}
                    alt="cross"
                  />
                ) : (
                  <img
                    src={Menu}
                    className="w-[1.5rem] z-20 transition-all duration-500 ease-in-out"
                    onClick={() => handleMenu(task.id)}
                    alt="menu"
                  />
                )}
                {/* dropdown menu */}
                <div
                  ref={menuRef}
                  className={`${
                    styles.flexCenter
                  } flex-col bg-green1/30 box-shadow-2 backdrop-blur-lg w-fit absolute -right-[0.5rem] -top-[0.4rem] transition-all duration-500 ease-in-out rounded-lg p-[1rem] z-10 ${
                    menu === task.id
                      ? " opacity-100 visible"
                      : " opacity-0 invisible"
                  }`}
                >
                  <button
                    type="button"
                    className={`${styles.flexCenter} w-full m-[0.1rem]`}
                    // onClick={() => handleShowTask(task.id)}
                  >
                    Open
                    {/* <img
                    src={UpArrow}
                    className="w-[1.2rem] transition-all duration-500 ease-in-out ml-[0.3rem]"
                    alt="up arrow"
                  /> */}
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
                    className={`${styles.btn3} flex justify-center w-full  m-[0.1rem]`}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className={`my-[0.7rem]`}>
                {truncateDescription(task.description, 60)}
              </p>
              <p className={`text-white/20 text-[0.8rem]`}>{task.date}</p>
            </div>
          ))}
        </div>
      </div>
      {/* <ShowTask /> */}
    </div>
  );
};

export default Dashboard;