import React, { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

const AddTask = ({ setShowAddTaskForm, onAddTask }) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const handleTaskTitleChange = (event) => {
        setTaskTitle(event.target.value);
    };

    const handleTaskDescriptionChange = (event) => {
        setTaskDescription(event.target.value);
    };

    const handleAddTask = () => {
        // Check if task title is not empty
        if (taskTitle.trim() === "") {
            // Display an error or prevent adding the task
            return;
        }

        // Create a new task object
        const newTask = {
            title: taskTitle,
            description: taskDescription
        };

        // Call the onAddTask function with the new task object
        onAddTask(newTask);

        // Clear input fields and close the add task form
        setTaskTitle("");
        setTaskDescription("");
        setShowAddTaskForm(false);
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-75 rounded-lg p-8 max-w-md w-full">
            <h2 className="text-white text-lg font-bold mb-4">Add Task</h2>
            <input
                type="text"
                placeholder="Task title"
                value={taskTitle}
                onChange={handleTaskTitleChange}
                className="block w-full bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
            />
            <textarea
                placeholder="Task description"
                value={taskDescription}
                onChange={handleTaskDescriptionChange}
                className="block w-full bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
                rows="4"
            ></textarea>
            <button
                className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                onClick={() => setShowAddTaskForm(false)}
            >
                <FiX />
            </button>
            <button
                className="bg-yellow-500 text-black py-2 px-4 rounded"
                onClick={handleAddTask}
            >
                <FiPlus />
            </button>
        </div>
    );
};

export default AddTask;
