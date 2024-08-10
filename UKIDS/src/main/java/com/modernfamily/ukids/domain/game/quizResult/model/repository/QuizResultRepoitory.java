package com.modernfamily.ukids.domain.game.quizResult.model.repository;

import com.modernfamily.ukids.domain.game.quizResult.entity.GameResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizResultRepoitory extends JpaRepository<GameResult, Long> {
}
