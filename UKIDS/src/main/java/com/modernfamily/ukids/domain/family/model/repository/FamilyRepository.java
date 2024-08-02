package com.modernfamily.ukids.domain.family.model.repository;

import com.modernfamily.ukids.domain.family.entity.Family;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FamilyRepository extends JpaRepository<Family, Long> {
    Family findById(long id);
}


