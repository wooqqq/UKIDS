package com.modernfamily.ukids.domain.letter.model.repository;

import com.modernfamily.ukids.domain.letter.entity.Letter;
import com.modernfamily.ukids.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LetterRepository extends JpaRepository<Letter, Long> {
    Optional<Letter> findByLetterId(Long letterId);
    List<Letter> findAllByFromUser(User fromUser);
    List<Letter> findAllByToUser(User toUser);
}
