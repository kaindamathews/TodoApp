import React, { useState, useEffect } from "react";
import TaskCard from "./component/TaskCard.jsx";
import { FiPlus } from "react-icons/fi";
import AddTask from "./component/AddTask.jsx";
import Narbar from "./component/Narbar.jsx";
import { fetchTasks, addTask, deleteTask, updateTask } from "../services/taskService";

const TaskListPage = () => {
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllTasks();
    }, []);

    const fetchAllTasks = async () => {
        try {
            setLoading(true);
            const fetchedTasks = await fetchTasks();
            setTasks(fetchedTasks);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async (newTask) => {
        try {
            await addTask(newTask);
            fetchAllTasks();
            setShowAddTaskForm(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            fetchAllTasks();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleUpdateTask = async (updatedTask) => {
        try {
            await updateTask(updatedTask);
            fetchAllTasks();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <Narbar />
            <div className="fixed bottom-4 right-4">
                <button className="bg-yellow-500 text-black py-2 px-4 rounded-full" onClick={() => setShowAddTaskForm(!showAddTaskForm)}>
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
