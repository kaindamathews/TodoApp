package com.example.backendtodoappapi;

import com.example.backendtodoappapi.controllers.TaskController;
import com.example.backendtodoappapi.task.TaskService;
import com.example.backendtodoappapi.task.request.TaskRequest;
import com.example.backendtodoappapi.task.response.TaskResponse;
import com.example.backendtodoappapi.user.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.security.Principal;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskControllerTests {

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController taskController;

    @Test
    void shouldAddTaskSuccessfully() {

        User user = new User();
        Principal principal = new UsernamePasswordAuthenticationToken(user, null);
        TaskRequest taskRequest = new TaskRequest("Sample Title", "Sample Description");
        TaskResponse expectedTaskResponse = new TaskResponse(1L, "Sample Title", "Sample Description");


        when(taskService.addNewTask(taskRequest, principal)).thenReturn(expectedTaskResponse);


        TaskResponse actualTaskResponse = taskController.addTask(taskRequest, principal);

        // Verify that the service method was called and the response is as expected
        verify(taskService).addNewTask(taskRequest, principal);
        assertNotNull(actualTaskResponse);
        assertEquals(expectedTaskResponse, actualTaskResponse);
    }

    @Test
    void shouldGetAllTaskByUser() {
        // Mock user and tasks
        User user = new User();
        Principal principal = new UsernamePasswordAuthenticationToken(user, null);
        TaskResponse taskResponse = new TaskResponse(1L, "Sample Title", "Sample Description");
        List<TaskResponse> expectedTaskResponses = Collections.singletonList(taskResponse);

        // Mock task service method
        when(taskService.getAllTasksByUserId(principal)).thenReturn(expectedTaskResponses);

        // Call the controller method
        List<TaskResponse> actualTaskResponses = taskController.getAllTaskByUser(principal);

        // Verify that the service method was called and the response is as expected
        verify(taskService).getAllTasksByUserId(principal);
        assertNotNull(actualTaskResponses);
        assertEquals(expectedTaskResponses, actualTaskResponses);
    }

    @Test
    void shouldUpdateTaskByTaskId() {
        long taskId = 123L;
        TaskRequest taskRequest = new TaskRequest("Updated Title", "Updated Description");
        TaskResponse expectedTaskResponse = new TaskResponse(taskId, "Updated Title", "Updated Description");

        // Mock task service method
        when(taskService.updateTaskByTaskId(taskId, taskRequest)).thenReturn(expectedTaskResponse);

        // Call the controller method
        TaskResponse actualTaskResponse = taskController.updateByTaskId(taskId, taskRequest);

        // Verify that the service method was called and the response is as expected
        verify(taskService).updateTaskByTaskId(taskId, taskRequest);
        assertNotNull(actualTaskResponse);
        assertEquals(expectedTaskResponse, actualTaskResponse);
    }

    @Test
    void shouldGetTaskByTaskId() {
        long taskId = 123L;
        TaskResponse expectedTaskResponse = new TaskResponse(taskId, "Sample Title", "Sample Description");

        // Mock task service method
        when(taskService.getTaskById(taskId)).thenReturn(expectedTaskResponse);

        // Call the controller method
        TaskResponse actualTaskResponse = taskController.getTaskByTaskId(taskId);

        // Verify that the service method was called and the response is as expected
        verify(taskService).getTaskById(taskId);
        assertNotNull(actualTaskResponse);
        assertEquals(expectedTaskResponse, actualTaskResponse);
    }

    @Test
    void shouldDeleteTaskByTaskId() {
        long taskId = 123L;

        // Call the controller method
        taskController.deleteTaskByTaskId(taskId);

        // Verify that the service method was called
        verify(taskService).deleteTaskById(taskId);
    }
}
