package com.modernfamily.ukids.domain.letter.repository;

import com.modernfamily.ukids.domain.letter.entity.Letter;
import com.modernfamily.ukids.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LetterRepository extends JpaRepository<Letter, Long> {
    List<Letter> findAllByFromUser(User fromUser);
    List<Letter> findAllByToUser(User toUser);
}
