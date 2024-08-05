package com.tfserving.backend.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfserving.backend.entities.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {
}
