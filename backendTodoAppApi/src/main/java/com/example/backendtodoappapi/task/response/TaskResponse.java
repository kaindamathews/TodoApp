package com.example.backendtodoappapi.task.response;

import com.example.backendtodoappapi.task.Task;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
public class TaskResponse {
private long id;
private String title;
private String description;

    public static TaskResponse fromTask(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .build();
    }
    public static List<TaskResponse> fromTasks(List<Task> tasks) {
        return tasks.stream()
                .map(TaskResponse::fromTask)
                .collect(Collectors.toList());
    }
}
