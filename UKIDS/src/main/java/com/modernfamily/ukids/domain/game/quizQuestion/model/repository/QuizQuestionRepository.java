package com.modernfamily.ukids.domain.game.quizQuestion.model.repository;

import com.modernfamily.ukids.domain.game.quizQuestion.entity.QuizQuestion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {

    Optional<QuizQuestion> findByQuizQuestionId(Long quizQuestionId);

    Page<QuizQuestion> findByWriter_UserId(Long userId, Pageable pageable);
}
