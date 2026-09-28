package com.example.studybuddy.controller;

import com.example.studybuddy.model.Membership;
import com.example.studybuddy.repository.MembershipRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/memberships")
public class MembershipController {

    private final MembershipRepository repository;

    public MembershipController(MembershipRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Membership create(@RequestBody Membership membership) {
        return repository.save(membership);
    }

    @GetMapping
    public List<Membership> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Membership getOne(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Membership update(@PathVariable Long id,
                             @RequestBody Membership membership) {

        Membership oldMembership = repository.findById(id).orElse(null);

        if (oldMembership != null) {
            oldMembership.setStudent(membership.getStudent());
            oldMembership.setStudyGroup(membership.getStudyGroup());

            return repository.save(oldMembership);
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        repository.deleteById(id);
        return "Membership deleted";
    }
}