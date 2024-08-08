import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../style/tailwindStyles";
import { getTaskById, deleteTask, truncateDescription } from "../utils/task";
import Close from "../assets/cross.svg";

const ShowTask = () => {
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleShowTask = (event) => {
      const taskId = event.detail;
      const task = getTaskById(taskId);
      setTask(task);
    };

    window.addEventListener("showTask", handleShowTask);

    return () => {
      window.removeEventListener("showTask", handleShowTask);
    };
  }, []);

  const handleClose = () => {
    setTask(null);
  };

  const handleDelete = () => {
    deleteTask(task.id);
    setTask(null);
    window.dispatchEvent(new Event("taskDeleted"));
    navigate("/");
  };

  if (!task) return null;

  return (
    <div
      className={`${styles.flexCenter} ${styles.paddingX} flex-col fixed inset-0 bg-black backdrop-blur-md bg-opacity-50 z-50 overflow-hidden`}
    >
      <div
        className={`${styles.flexStart} flex-col relative bg-darkPrimary p-8 rounded-lg w-[80vw] sm:w-[65vw] md:min-w-[50vw] md:max-w-[1200px] min-h-[20rem] max-h-[80vh] shadow-lg overflow-hidden`}
      >
        <div>
          <h2
            className={`absolute box-shadow-66 top-[2rem] left-[2rem] right-[2rem] text-green1 text-2xl font-bold w-full z-20`}
          >
            {truncateDescription(task.title)}
          </h2>
          <p
            className={`text-white/20 text-[0.8rem] absolute top-[4rem] left-[2rem] z-20`}
          >
            {task.date}
          </p>
        </div>
        <div
          className={`absolute top-[6rem] left-[2rem] pr-[1rem] overflow-y-auto min-h-full max-h-[60vh] pt-[1rem]`}
        >
          {truncateDescription(task.description)}
        </div>

        <div
          className={`flex justify-end box-shadow-6 w-full absolute bottom-[0rem] p-[1rem] right-0 bg-darkPrimary`}
        >
          <button
            type="button"
            onClick={() => navigate(`/edit/${task.id}`)}
            className={`${styles.btn2} m-[0.1rem]`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className={`${styles.deleteBtn} flex justify-center m-[0.1rem]`}
          >
            Delete
          </button>
        </div>
        <button onClick={handleClose} className={``}>
          <img
            src={Close}
            className={`absolute w-[1.6rem] top-[1rem] right-[1rem]`}
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default ShowTask;
