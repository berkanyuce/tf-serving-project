package com.tfserving.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Table(name = "tb_users")
@Data
public class Users {

    @Id
    Long id;

    String user_name;
    String user_password;

}
