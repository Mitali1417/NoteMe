import React, { useEffect, useState } from "react";
import { styles } from "../style/tailwindStyles";
import { useNavigate, useParams } from "react-router-dom";
import { editTask, deleteTask, getTaskById } from "../utils/task";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../style/quillStyles";

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
    if (title === "" || description === "") {
      alert("Please fill the details");
    } else {
      const date = new Date().toLocaleString();
      editTask(id, title, description, date);
      navigate("/");
    }
  };

  const handleDeleteTask = () => {
    deleteTask(id);
    navigate("/");
  };

  return (
    <div className="p-4 pt-0">
      <div
        className={`${styles.background} ${styles.flexCenter} flex-col px-16`}
      >
        <div className={`${styles.flexBetween} w-full text-lg font-medium`}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${styles.input1}`}
          />
        </div>
        <div className="text-white/80 w-full my-2 text-lg">
          <ReactQuill
            theme="snow"
            formats={formats}
            modules={modules}
            placeholder="Description"
            value={description}
            onChange={setDescription}
            className={`${styles.input2} min-h-[55vh] resize-none w-full box-shadow`}
          />
        </div>
        <div className="w-full flex justify-end space-x-4">
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
            className={`${styles.deleteBtn}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
