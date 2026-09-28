package com.example.studybuddy.repository;

import com.example.studybuddy.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
}