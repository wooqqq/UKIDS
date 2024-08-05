package com.modernfamily.ukids.domain.user.model.repository;

import com.modernfamily.ukids.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsById(String id);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    Optional<User> findById(String id);
    Optional<User> findByUserId(Long userId);


}
