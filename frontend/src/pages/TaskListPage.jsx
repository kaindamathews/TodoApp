import React, { useState } from "react";
import TaskCard from "./component/TaskCard.jsx";
import {FiUser, FiPlus, FiX} from "react-icons/fi";
import AddTask from "./component/AddTask.jsx";
import Narbar from "./component/Narbar.jsx";


const TaskListPage = () => {
    const [showAddTaskForm, setShowAddTaskForm] = useState(false); // State to manage visibility of add task form

    const handleAddTaskClick = () => {
        setShowAddTaskForm(!showAddTaskForm);
    };

    const tasks = [
        {
            id: 1,
            title: "Complete Project Proposal",
            description: "Finish writing the project proposal document and submit it by Friday.",
            date: "2024-04-05",
        },
        {
            id: 2,
            title: "Prepare Presentation Slides",
            description: "Create slides for the upcoming team presentation meeting.",
            date: "2024-04-10",
        },
        {
            id: 3,
            title: "Review Code Changes",
            description: "Review and provide feedback on the latest code changes in the development branch.",
            date: "2024-04-15",
        },
        {
            id: 4,
            title: "Review Code Changes",
            description: "Review and provide feedback on the latest code changes in the development branch.",
            date: "2024-04-15",
        },

        {
            id: 5,
            title: "Review Code Changes",
            description: "Review and provide feedback on the latest code changes in the development branch.",
            date: "2024-04-15",
        },
        // Add more tasks as needed
    ];




    return (
        <div>

            <Narbar />

            {/* Button to toggle add task form */}
            <div className="fixed bottom-4 right-4">
                <button className="bg-yellow-500 text-black py-2 px-4 rounded-full" onClick={handleAddTaskClick}>
                    <FiPlus />
                </button>
            </div>

            {/* Task cards */}
            <div className="flex justify-center">
                <div className="mt-20 p-10 w-full max-w-screen-lg">
                    {tasks.map(task => (
                        <TaskCard key={task.id} task={task}/>
                    ))}
                </div>
            </div>


            {showAddTaskForm && (
                <AddTask setShowAddTaskForm={setShowAddTaskForm} />

            )}

        </div>
    );
};

export default TaskListPage;
