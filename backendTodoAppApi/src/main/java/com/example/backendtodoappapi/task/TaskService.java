package com.example.backendtodoappapi.task;

import com.example.backendtodoappapi.task.request.TaskRequest;
import com.example.backendtodoappapi.task.response.TaskResponse;
import com.example.backendtodoappapi.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import static com.example.backendtodoappapi.task.response.TaskResponse.fromTask;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    public TaskResponse addNewTask(TaskRequest taskRequest, Principal connectedUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        Task task = Task.builder()
                .title(taskRequest.getTitle())
                .description(taskRequest.getDescription())
                .user(user)
                .build();
        Task saveTask = taskRepository.save(task);
        return TaskResponse.fromTask(saveTask);
    }


    public void deleteTaskById(Long taskId) {
        taskRepository.deleteById(taskId);
    }


    public TaskResponse updateTaskByTaskId(long taskId, TaskRequest taskRequest) {

            Optional<Task> existingTaskOptional = taskRepository.findById(taskId);
            if (existingTaskOptional.isPresent()) {
                Task existingTask = existingTaskOptional.get();
                existingTask.setTitle(taskRequest.getTitle());
                existingTask.setDescription(taskRequest.getDescription());
                Task saveUpdateTask = taskRepository.save(existingTask);

                return TaskResponse.fromTask(saveUpdateTask);
            } else {

                throw new IllegalArgumentException("Task with ID " + taskId + " not found");
            }

    }


    // Method to get a task by its ID
    public TaskResponse getTaskById(Long taskId) {
        Optional<Task> task = taskRepository.findById(taskId);
        if(task.isPresent()){
            Task getTask = task.get();
            return TaskResponse.fromTask(getTask);
        }else{
            throw new IllegalArgumentException("Task with ID " + taskId + " not found");
        }
    }

    // Method to get all tasks by user ID
    public List<TaskResponse> getAllTasksByUserId(Principal connectedUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        List<Task> tasks = taskRepository.findAllByUser(user);
        return TaskResponse.fromTasks(tasks);
    }


}
