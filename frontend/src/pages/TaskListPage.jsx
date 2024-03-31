import React, { useState, useEffect } from "react";
import TaskCard from "./component/TaskCard.jsx";
import { FiPlus } from "react-icons/fi";
import AddTask from "./component/AddTask.jsx";
import Narbar from "./component/Narbar.jsx";

const TaskListPage = () => {
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:8080/api/v1/task/getAllTaskByUser", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTaskClick = () => {
        setShowAddTaskForm(!showAddTaskForm);
    };

    const handleAddTask = async (newTask) => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/task/addTask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify(newTask)
            });
            if (!response.ok) {
                throw new Error("Failed to add task");
            }
            fetchTasks();
            setShowAddTaskForm(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/task/deleteTaskByTaskId/${taskId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            if (!response.ok) {
                throw new Error("Failed to delete task");
            }
            fetchTasks();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleUpdateTask = async (updatedTask) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/task/updateTaskByTaskId/${updatedTask.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify(updatedTask)
            });
            if (!response.ok) {
                throw new Error("Failed to update task");
            }
            fetchTasks();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <Narbar />
            <div className="fixed bottom-4 right-4">
                <button className="bg-yellow-500 text-black py-2 px-4 rounded-full" onClick={handleAddTaskClick}>
                    <FiPlus />
                </button>
            </div>
            <div className="flex justify-center">
                <div className="mt-20 p-10 w-full max-w-screen-lg">
                    {loading && <p>Loading tasks...</p>}
                    {error && <p>Error: {error}</p>}
                    {!loading && !error && tasks.map(task => (
                        <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} onUpdate={handleUpdateTask} />
                    ))}
                </div>
            </div>
            {showAddTaskForm && <AddTask setShowAddTaskForm={setShowAddTaskForm} onAddTask={handleAddTask} />}
        </div>
    );
};

export default TaskListPage;
