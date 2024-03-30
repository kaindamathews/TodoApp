package com.example.backendtodoappapi.task;

import com.example.backendtodoappapi.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task,Long> {
    List<Task> findAllByUser(User user);


}
