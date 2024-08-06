package com.modernfamily.ukids.domain.caption.model.repository;

import com.modernfamily.ukids.domain.caption.entity.Caption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CaptionRepository extends JpaRepository<Caption, Long> {
    Optional<Caption> findByCaptionId(Long captionId);
}
