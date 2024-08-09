package com.modernfamily.ukids.domain.game.gameResult.model.repository;

import com.modernfamily.ukids.domain.game.gameResult.entity.GameResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameResultRepoitory extends JpaRepository<GameResult, Long> {
}
