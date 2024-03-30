package com.example.backendtodoappapi.task.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TaskRequest {
    private String title;
    private String description;
}
