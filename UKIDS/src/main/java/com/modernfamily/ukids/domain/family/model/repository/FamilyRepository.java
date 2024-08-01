package com.modernfamily.ukids.domain.family.model.repository;

import com.modernfamily.ukids.domain.family.entity.Family;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FamilyRepository extends JpaRepository<Family, Long> {

    public Optional<Family> findByFamilyId(Long familyId);

    public boolean existsByCode(String code);

    public Optional<Family> findByCode(String code);

    public void deleteByFamilyId(Long familyId);
}
