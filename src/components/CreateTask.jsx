import React, { useState } from "react";
import { styles } from "../style/tailwindStyles";
import { addTask } from "../utils/task";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../style/quillStyles";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleAddTask = () => {
    if (title === "" || description === "") {
      alert("Please fill the details");
      navigate("/create");
    } else {
      const date = new Date().toLocaleString();
      addTask(title, description, date);
      setTitle("");
      setDescription("");
      navigate("/");
    }
  };

  return (
    <div className="p-[1rem] pt-0">
      <div
        className={`${styles.background} ${styles.flexCenter} flex-col px-[4rem]`}
      >
        <div
          className={`${styles.flexBetween} w-full text-[1.2rem] font-medium`}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className={`${styles.input1}`}
          />
        </div>
        <div className="text-white/80 w-full my-[0.5rem] text-[1.2rem]">
          <ReactQuill
            theme="snow"
            formats={formats}
            modules={modules}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            cols="30"
            rows="10"
            required
            className={` ${styles.input2} min-h-[55vh] resize-none w-full box-shadow `}
          />
        </div>
        <button
          type="button"
          onClick={handleAddTask}
          className={`${styles.btn2}`}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default CreateTask;
