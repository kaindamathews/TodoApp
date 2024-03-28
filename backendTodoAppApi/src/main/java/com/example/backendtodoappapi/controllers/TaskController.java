package com.example.backendtodoappapi.controllers;

import com.example.backendtodoappapi.task.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1/task")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class TaskController {
    private final TaskService taskService;

}
