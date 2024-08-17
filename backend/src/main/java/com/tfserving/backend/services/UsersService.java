package com.tfserving.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.tfserving.backend.repos.UsersRepository;
import com.tfserving.backend.entities.Users;
import com.tfserving.backend.dtos.UsersRegisterDTO;

import java.util.List;

@Service
public class UsersService {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UsersService(UsersRepository usersRepository, BCryptPasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
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
            existingUser.setUsername(user.getUsername());
            if (user.getUserpassword() != null && !user.getUserpassword().isEmpty()) {
                existingUser.setUserpassword(passwordEncoder.encode(user.getUserpassword())); // Şifreyi hash'leyin
            }
            usersRepository.save(existingUser);
        }
    }

    public void deleteUser(Long id) {
        usersRepository.deleteById(id);
    }

    public boolean isUserExists(String username) {
        return usersRepository.findByUsername(username) != null;
    }

    public Users registerNewUser(UsersRegisterDTO userRegistrationDTO) {
        if (isUserExists(userRegistrationDTO.getUsername())) {
            return null; // Kullanıcı zaten varsa, null döndür
        }

        Users user = new Users();
        user.setUsername(userRegistrationDTO.getUsername());
        user.setUserpassword(passwordEncoder.encode(userRegistrationDTO.getUserpassword()));
        return usersRepository.save(user);
    }

    public boolean login(String username, String userpassword) {
        Users user = usersRepository.findByUsername(username);
        if (user != null && passwordEncoder.matches(userpassword, user.getUserpassword())) {
            return true;
        }
        return false;
    }
}
