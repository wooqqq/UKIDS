package com.modernfamily.ukids.domain.user.model.repository;

import com.modernfamily.ukids.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    Boolean existsById(String id);
}
