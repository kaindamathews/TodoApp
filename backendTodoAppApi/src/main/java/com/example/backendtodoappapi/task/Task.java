package com.example.backendtodoappapi.task;

import com.example.backendtodoappapi.baseentity.BaseEntity;
import com.example.backendtodoappapi.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@Entity
@Table(name = "_tasks")
public class Task extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public User user;

    private TaskCategory category;
    private String title;
    private String description;
    private TaskStatus status;

    public Task() {
        this.status = TaskStatus.PENDING;
    }
}
