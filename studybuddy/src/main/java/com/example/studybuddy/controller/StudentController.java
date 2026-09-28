package com.example.studybuddy.controller;

import com.example.studybuddy.model.Student;
import com.example.studybuddy.repository.StudentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentRepository repository;

    public StudentController(StudentRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Student create(@RequestBody Student student) {
        return repository.save(student);
    }

    @GetMapping
    public List<Student> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Student getOne(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Student update(@PathVariable Long id,
                          @RequestBody Student student) {

        Student oldStudent = repository.findById(id).orElse(null);

        if (oldStudent != null) {
            oldStudent.setName(student.getName());
            oldStudent.setEmail(student.getEmail());
            oldStudent.setDepartment(student.getDepartment());

            return repository.save(oldStudent);
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        repository.deleteById(id);
        return "Student deleted";
    }
}