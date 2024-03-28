package com.example.backendtodoappapi.task;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Long,Task> {
    void deleteById(Long taskId);
    Optional<Task> findById(Long taskId);
    List<Task> findAllByUserId(Long userId);
}
