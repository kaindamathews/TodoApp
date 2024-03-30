package com.example.backendtodoappapi.controllers;

import com.example.backendtodoappapi.task.TaskService;
import com.example.backendtodoappapi.task.request.TaskRequest;
import com.example.backendtodoappapi.task.response.TaskResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1/task")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class TaskController {
    private final TaskService taskService;

    @PostMapping("/addTask")
    @PreAuthorize("hasAnyAuthority('user:create')")
    public TaskResponse addTask(@RequestBody TaskRequest taskRequest, Principal connectedUser){
        return taskService.addNewTask(taskRequest,connectedUser);
    }

    @GetMapping("/getAllTaskByUser")
    @PreAuthorize("hasAnyAuthority('user:read')")
    public List<TaskResponse> getAllTaskByUser(Principal connectedUser){
        return taskService.getAllTasksByUserId(connectedUser);
    }
    @PatchMapping("/updateByTaskId")
    @PreAuthorize("hasAnyAuthority('user:update')")
    public TaskResponse updateByTaskId(@RequestParam long taskId,@RequestBody TaskRequest taskRequest ){
        return  taskService.updateTaskByTaskId(taskId, taskRequest);
    }

    @GetMapping("/getTaskByTaskId")
    @PreAuthorize("hasAnyAuthority('user:read')")
    public TaskResponse getTaskByTaskId(@RequestParam long taskId){
        return taskService.getTaskById(taskId);
    }

    @DeleteMapping("/deleteTaskByTaskId")
    @PreAuthorize("hasAnyAuthority('user:delete')")
    public void deleteTaskByTaskId(@RequestParam long taskId){
        taskService.deleteTaskById(taskId);
    }

}
