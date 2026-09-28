package com.example.studybuddy.controller;

import com.example.studybuddy.model.StudyGroup;
import com.example.studybuddy.repository.StudyGroupRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/study-groups")
public class StudyGroupController {

    private final StudyGroupRepository repository;

    public StudyGroupController(StudyGroupRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public StudyGroup create(@RequestBody StudyGroup group) {
        return repository.save(group);
    }

    @GetMapping
    public List<StudyGroup> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public StudyGroup getOne(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public StudyGroup update(@PathVariable Long id,
                             @RequestBody StudyGroup group) {

        StudyGroup oldGroup = repository.findById(id).orElse(null);

        if (oldGroup != null) {
            oldGroup.setGroupName(group.getGroupName());
            oldGroup.setMaxMembers(group.getMaxMembers());
            oldGroup.setSubject(group.getSubject());
            oldGroup.setOwner(group.getOwner());

            return repository.save(oldGroup);
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        repository.deleteById(id);
        return "Study group deleted";
    }
}