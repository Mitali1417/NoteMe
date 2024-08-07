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
      className={`${styles.flexCenter} ${styles.paddingX} flex-col fixed inset-0 bg-black backdrop-blur-md bg-opacity-50 z-50 overflow-y-auto`}
    >
      <div
        className={`${styles.flexStart} flex-col relative bg-darkPrimary p-8 rounded-lg md:w-1/3 w-[80vw] md:max-w-[80vw] max-h-[80vh] overflow-y-auto shadow-lg`}
      >
        <div>
          <h2 className={`text-green1 text-2xl font-bold my-4`}>
            {truncateDescription(task.title)}
          </h2>
        </div>
        <p className="mb-4">{truncateDescription(task.description)}</p>
        <div className={`flex justify-end w-full`}>
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
