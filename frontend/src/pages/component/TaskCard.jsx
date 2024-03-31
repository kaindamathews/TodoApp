import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
const TaskCard = ({ task, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(task);

    const handleDelete = () => {
        onDelete(task.id); // Call onDelete handler with task id
    };

    const handleEdit = () => {
        setIsEditing(true); // Set editing mode to true
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask({ ...updatedTask, [name]: value });
    };

    const handleSave = () => {
        onUpdate(updatedTask); // Call onUpdate handler with updated task
        setIsEditing(false); // Exit editing mode
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        name="title"
                        value={updatedTask.title}
                        onChange={handleChange}
                        className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 mb-2"
                    />
                    <textarea
                        name="description"
                        value={updatedTask.description}
                        onChange={handleChange}
                        className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 mb-2"
                    />
                    <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2" onClick={handleSave}>
                        Save
                    </button>
                </div>
            ) : (
                <div>
                    <h2 className="text-lg font-bold mb-2">{task.title} {task.id}</h2>
                    <p className="text-gray-700">{task.description} </p>
                    <div className="flex justify-between items-center mt-4">

                        <div className="flex">
                            <button className="text-gray-500 hover:text-blue-500 mr-2" onClick={handleEdit}>
                                <FiEdit /> {/* Edit icon */}
                            </button>
                            <button className="text-gray-500 hover:text-red-500" onClick={handleDelete}>
                                <FiTrash2 /> {/* Delete icon */}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskCard;
