package com.modernfamily.ukids.domain.game.callGameResult.model.repository;

import com.modernfamily.ukids.domain.game.callGameResult.entity.CallMyNameGameResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CallMyNameGameResultRepository extends JpaRepository<CallMyNameGameResult, Long> {
}
