import React from "react";
import { FiPlus, FiX } from "react-icons/fi";

const AddTask = ({ setShowAddTaskForm }) => {
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-75 rounded-lg p-8 max-w-md w-full">
            <h2 className="text-white text-lg font-bold mb-4">Add Task</h2>
            <input
                type="text"
                placeholder="Task title"
                className="block w-full bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
            />
            <textarea
                placeholder="Task description"
                className="block w-full bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
                rows="4"
            ></textarea>
            <button
                className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                onClick={() => setShowAddTaskForm(false)}
            >
                <FiX />
            </button>
            <button className="bg-yellow-500 text-black py-2 px-4 rounded">
                <FiPlus />
            </button>
        </div>
    );
};

export default AddTask;
