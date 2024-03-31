package com.example.backendtodoappapi;

import com.example.backendtodoappapi.task.Task;
import com.example.backendtodoappapi.task.TaskRepository;
import com.example.backendtodoappapi.task.TaskService;
import com.example.backendtodoappapi.task.request.TaskRequest;
import com.example.backendtodoappapi.task.response.TaskResponse;
import com.example.backendtodoappapi.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskServiceTests {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    void shouldDeleteTaskById() {
        long taskId = 123L;

        // Call the service method
        taskService.deleteTaskById(taskId);

        // Verify that the task was deleted
        verify(taskRepository).deleteById(taskId);
    }

    @Test
    void shouldUpdateTaskByTaskId() {
        long taskId = 456L;
        TaskRequest updatedTaskRequest = new TaskRequest("Updated Title", "Updated Description");
        Task existingTask = new Task();

        // Mock existing task
        when(taskRepository.findById(taskId)).thenReturn(Optional.of(existingTask));
        // Mock task update
        when(taskRepository.save(existingTask)).thenReturn(existingTask);

        // Call the service method
        TaskResponse updatedTaskResponse = taskService.updateTaskByTaskId(taskId, updatedTaskRequest);

        // Verify that the task was updated and the response is as expected
        verify(taskRepository).save(existingTask);
        assertNotNull(updatedTaskResponse);
        assertEquals(updatedTaskRequest.getTitle(), updatedTaskResponse.getTitle());
        assertEquals(updatedTaskRequest.getDescription(), updatedTaskResponse.getDescription());
    }

    @Test
    void shouldGetTaskById() {
        long taskId = 789L;
        Task existingTask = new Task();

        // Mock existing task
        when(taskRepository.findById(taskId)).thenReturn(Optional.of(existingTask));

        // Call the service method
        TaskResponse taskResponse = taskService.getTaskById(taskId);

        // Verify that the response is as expected
        assertNotNull(taskResponse);
        assertEquals(existingTask.getId(), taskResponse.getId());
    }

    @Test
    void shouldGetAllTasksByUserId() {
        User user = new User();
        Principal principal = new UsernamePasswordAuthenticationToken(user, null);
        Task task = new Task();
        List<Task> tasks = Collections.singletonList(task);

        // Mock tasks retrieval
        when(taskRepository.findAllByUser(user)).thenReturn(tasks);

        // Call the service method
        List<TaskResponse> taskResponses = taskService.getAllTasksByUserId(principal);

        // Verify that the response is as expected
        assertNotNull(taskResponses);
        assertEquals(1, taskResponses.size());
        assertEquals(task.getId(), taskResponses.get(0).getId());
    }
}
