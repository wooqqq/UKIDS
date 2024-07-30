package com.modernfamily.ukids.domain.letter.repository;

import com.modernfamily.ukids.domain.letter.entity.Letter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LetterRepository extends JpaRepository<Letter, Long> {

}
