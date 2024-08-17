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
import java.util.List;

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
    public ResponseEntity<String> registerUser(@Validated @RequestBody UsersRegisterDTO userRegistrationDTO) {
        Users registeredUser = usersService.registerNewUser(userRegistrationDTO);
        if (registeredUser == null) {
            return new ResponseEntity<>("User already exists", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Validated @RequestBody LoginDTO loginDTO) {
        boolean isAuthenticated = usersService.login(loginDTO.getUsername(), loginDTO.getUserpassword());
        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
