import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const role = localStorage.getItem("role");

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    const title = prompt("Enter title:");
    const description = prompt("Enter description:");
    if (!title || !description) return;

    await API.post("/tasks", { title, description });
    fetchTasks();
  };

  const editTask = async (task) => {
    const newTitle = prompt("Edit title:", task.title);
    const newDescription = prompt("Edit description:", task.description);
    if (!newTitle || !newDescription) return;

    await API.put(`/tasks/${task._id}`, {
      title: newTitle,
      description: newDescription,
    });

    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-3xl font-bold">
          Dashboard <span className="text-gray-500 text-lg">({role})</span>
        </h1>

        <button
          onClick={createTask}
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          + Create Task
        </button>
      </div>

      {/* Tasks Grid */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">
              {task.title}
            </h3>

            <p className="text-gray-600 mb-4">
              {task.description}
            </p>

            {/* Admin Info */}
            {role === "admin" && task.user && (
              <p className="text-sm text-gray-400 mb-3">
                Created by: {task.user.name} ({task.user.email})
              </p>
            )}

            <div className="flex justify-between items-center">
              <button
                onClick={() => editTask(task)}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>

              {role === "admin" && (
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
