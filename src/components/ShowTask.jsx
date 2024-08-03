import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { styles } from "../style/tailwindStyles";
import { getTaskById, deleteTask, getTasks } from "../utils/task";

const ShowTask = () => {
  const [task, setTask] = useState(null);
  const showTaskRef = useRef();
  const navigate = useNavigate(); // Initialize useNavigate

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
    <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-md bg-opacity-50 z-50">
      <div className="bg-darkPrimary p-8 rounded-lg w-1/3 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
        <p className="mb-4">{task.description}</p>
        <button
          type="button"
          onClick={() => navigate(`/edit/${task.id}`)}
          className={`${styles.btn2} w-full m-[0.1rem]`}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className={`${styles.btn3} flex justify-center w-full  m-[0.1rem]`}
        >
          Delete
        </button>
        <button onClick={handleClose} className={`${styles.btn2}`}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ShowTask;
