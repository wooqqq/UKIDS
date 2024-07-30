package com.modernfamily.ukids.domain.user.model.repository;

import com.modernfamily.ukids.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Boolean existsById(String id);

    User findById(String id);


}
