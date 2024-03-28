package com.example.backendtodoappapi.task;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;

//    // Method to add a new task
//    public Task addNewTask(Task task) {
//        return taskRepository.save(task);
//    }

    // Method to delete a task by its ID
    public void deleteTaskById(Long taskId) {
        taskRepository.deleteById(taskId);
    }


//    public Task updateTaskByIdOrCreate(Task task) {
//        if (task.getId() != null) {
//            // If task ID is provided, attempt to update the existing task
//            Optional<Task> existingTaskOptional = taskRepository.findById(task.getId());
//            if (existingTaskOptional.isPresent()) {
//                Task existingTask = existingTaskOptional.get();
//                existingTask.setCategory(task.getCategory());
//                existingTask.setTitle(task.getTitle());
//                existingTask.setDescription(task.getDescription());
//                existingTask.setStatus(task.getStatus());
//                return taskRepository.save(existingTask);
//            } else {
//                // If task with the provided ID does not exist, throw an exception or handle accordingly
//                throw new IllegalArgumentException("Task with ID " + task.getId() + " not found");
//            }
//        } else {
//            // If task ID is not provided, create a new task
//            return taskRepository.save(task);
//        }
//    }


    // Method to get a task by its ID
    public Optional<Task> getTaskById(Long taskId) {
        return taskRepository.findById(taskId);
    }

    // Method to get all tasks by user ID
    public List<Task> getAllTasksByUserId(Long userId) {
        return taskRepository.findAllByUserId(userId);
    }


}
