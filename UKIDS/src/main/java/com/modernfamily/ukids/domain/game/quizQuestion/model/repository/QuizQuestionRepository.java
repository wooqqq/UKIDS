package com.modernfamily.ukids.domain.game.quizQuestion.model.repository;

import com.modernfamily.ukids.domain.game.quizQuestion.entity.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {
}
