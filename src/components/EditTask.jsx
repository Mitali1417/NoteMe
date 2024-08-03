import React, { useEffect, useState } from "react";
import { styles } from "../style/tailwindStyles";
import { useNavigate, useParams } from "react-router-dom";
import { editTask, deleteTask, getTaskById } from "../utils/task";

const EditTask = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const task = getTaskById(id);
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [id]);

  const handleEditTask = () => {
    const date = new Date().toLocaleString();
    editTask(id, title, description, date);
    navigate("/");
  };

  const handleDeleteTask = () => {
    deleteTask(id);
    navigate("/");
  };

  return (
    <div className={`p-[1rem] pt-0`}>
      <div
        className={`${styles.background} ${styles.flexCenter} flex-col px-[4rem]`}
      >
        <div
          className={`${styles.flexBetween}  w-full text-[1.2rem] font-medium`}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${styles.input1}`}
          />
          <div className={`w-full flex justify-end`}>
            <button
              type="button"
              onClick={handleEditTask}
              className={`${styles.btn2}`}
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleDeleteTask}
              className={`${styles.btn3} `}
            >
              Delete
            </button>
          </div>
        </div>
        <div className={` text-white/80 w-full my-[0.5rem] text-[1.2rem]`}>
          <textarea
            cols="30"
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`min-h-[55vh] w-full box-shadow ${styles.input2}`}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
