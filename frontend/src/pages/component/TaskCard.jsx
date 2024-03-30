import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Importing edit and delete icons from react-icons/fi

const TaskCard = ({ task }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">{task.title}</h2>
            <p className="text-gray-700">{task.description}</p>
            <div className="flex justify-between items-center mt-4">
                <span className="text-gray-500">{task.date}</span>
                <div className="flex">
                    <button className="text-gray-500 hover:text-blue-500 mr-2">
                        <FiEdit /> {/* Edit icon */}
                    </button>
                    <button className="text-gray-500 hover:text-red-500">
                        <FiTrash2 /> {/* Delete icon */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
