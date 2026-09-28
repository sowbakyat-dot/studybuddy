package com.example.studybuddy.controller;

import com.example.studybuddy.model.User;
import com.example.studybuddy.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return repository.save(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {

        for (User existingUser : repository.findAll()) {

            if (existingUser.getEmail().equals(user.getEmail())
                    && existingUser.getPassword().equals(user.getPassword())) {

                return "Login successful";
            }
        }

        return "Invalid email or password";
    }
}