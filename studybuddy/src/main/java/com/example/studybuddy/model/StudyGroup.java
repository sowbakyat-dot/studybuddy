package com.example.studybuddy.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class StudyGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId;

    private String groupName;
    private int maxMembers;

    @ManyToOne
    private Subject subject;

    @ManyToOne
    private Student owner;

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public int getMaxMembers() {
        return maxMembers;
    }

    public void setMaxMembers(int maxMembers) {
        this.maxMembers = maxMembers;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Student getOwner() {
        return owner;
    }

    public void setOwner(Student owner) {
        this.owner = owner;
    }
}