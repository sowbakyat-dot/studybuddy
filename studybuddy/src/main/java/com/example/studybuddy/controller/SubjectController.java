package com.example.studybuddy.controller;

import com.example.studybuddy.model.Subject;
import com.example.studybuddy.repository.SubjectRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subjects")
public class SubjectController {

    private final SubjectRepository repository;

    public SubjectController(SubjectRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Subject create(@RequestBody Subject subject) {
        return repository.save(subject);
    }

    @GetMapping
    public List<Subject> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Subject getOne(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Subject update(@PathVariable Long id,
                          @RequestBody Subject subject) {

        Subject oldSubject = repository.findById(id).orElse(null);

        if (oldSubject != null) {
            oldSubject.setSubjectName(subject.getSubjectName());
            oldSubject.setSubjectCode(subject.getSubjectCode());

            return repository.save(oldSubject);
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        repository.deleteById(id);
        return "Subject deleted";
    }
}