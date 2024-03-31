
const baseurl = "http://localhost:8080/api/v1/task";

const fetchTasks = async () => {
    const response = await fetch(`${baseurl}/getAllTaskByUser`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }
    return await response.json();
};

const addTask = async (newTask) => {
    const response = await fetch(`${baseurl}/addTask`, {
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
};

const deleteTask = async (taskId) => {
    const response = await fetch(`${baseurl}/deleteTaskByTaskId?taskId=${taskId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to delete task");
    }
};

const updateTask = async (updatedTask) => {
    const response = await fetch(`${baseurl}/updateByTaskId?taskId=${updatedTask.id}`, {
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
};

export { fetchTasks, addTask, deleteTask, updateTask };
