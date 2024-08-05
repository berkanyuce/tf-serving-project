package com.tfserving.backend.services;

import org.springframework.stereotype.Service;

import com.tfserving.backend.repos.UsersRepository;
import com.tfserving.backend.entities.Users;
import java.util.List;

@Service
public class UsersService {

    UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public List<Users> getUsers() {
        return usersRepository.findAll();
    }

    public Users createUser(Users user) {
        return usersRepository.save(user);
    }

    public Users getUser(Long id) {
        return usersRepository.findById(id).orElse(null);
    }

    public void updateUser(Long id, Users user) {
        Users existingUser = usersRepository.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setUser_name(user.getUser_name());
            existingUser.setUser_password(user.getUser_password());
            usersRepository.save(existingUser);
        }
    }

    public void deleteUser(Long id) {
        usersRepository.deleteById(id);
    }

}
