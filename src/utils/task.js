export const addTask = (title, description, date) => { // Add parameters
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask = {
      id: Date.now(),
      title,
      description,
      date,
    };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  

export const editTask = (id, title, description, date) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updateTasks = tasks.map((task) =>
    task.id === parseInt(id) ? { ...task, title, description, date } : task
  );
  localStorage.setItem("tasks", JSON.stringify(updateTasks));
};

export const deleteTask = (id) => {
  const tasks = JSON.parse(localStorage.getItem("tasks") || []);
  const updateTasks = tasks.filter((task) => task.id != parseInt(id));
  localStorage.setItem("tasks", JSON.stringify(updateTasks));
};

export const getTasks = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

export const getTaskById = (id) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasks.find((task) => task.id === parseInt(id));
};

export const truncateDescription = (description, maxLength) => {
  const plainDescription = description.replace(/<([^>]+)>/g, "");
  return plainDescription.length > maxLength
    ? plainDescription.substring(0, maxLength) + "..."
    : plainDescription;
};