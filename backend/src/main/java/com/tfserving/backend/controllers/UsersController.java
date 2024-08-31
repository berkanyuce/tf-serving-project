package com.tfserving.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import com.tfserving.backend.services.UsersService;
import com.tfserving.backend.dtos.LoginDTO;
import com.tfserving.backend.dtos.UsersRegisterDTO;
import com.tfserving.backend.entities.Users;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UsersController {

    private UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping
    public List<Users> getUsers() {
        return usersService.getUsers();
    }

    @PostMapping
    public Users createUser(@RequestBody Users user) {
        return usersService.createUser(user);
    }

    @GetMapping("/{id}")
    public Users getUser(@PathVariable Long id) {
        return usersService.getUser(id);
    }

    @PutMapping("/{id}")
    public void updateUser(@PathVariable Long id, @RequestBody Users user) {
        usersService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        usersService.deleteUser(id);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(
            @Validated @RequestBody UsersRegisterDTO userRegistrationDTO) {
        Users registeredUser = usersService.registerNewUser(userRegistrationDTO);
        Map<String, Object> response = new HashMap<>();

        if (registeredUser == null) {
            response.put("message", "User already exists");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        response.put("message", "User registered successfully");
        response.put("user", Map.of(
                "username", registeredUser.getUsername(),
                "id", registeredUser.getId()));

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Validated @RequestBody LoginDTO loginDTO) {
        Users user = usersService.loginAndGetUser(loginDTO.getUsername(), loginDTO.getUserpassword());
        Map<String, Object> response = new HashMap<>();
        if (user != null) {
            response.put("message", "Login successful");
            response.put("user", Map.of(
                    "username", user.getUsername(),
                    "id", user.getId()));
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

}
