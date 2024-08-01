package com.modernfamily.ukids.domain.familyMember.model.repository;
import com.modernfamily.ukids.domain.familyMember.dto.FamilyMemberJoinDto;
import com.modernfamily.ukids.domain.familyMember.entity.FamilyMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FamilyMemberRepository extends JpaRepository<FamilyMember, Long> {

    @Query(value = "select " +
            "new com.modernfamily.ukids.domain.familyMember.dto.FamilyMemberJoinDto(fm.familyMemberId, fm.user, fm.family) " +
            "from FamilyMember fm inner join fm.family f " +
            "on fm.family.familyId = f.familyId " +
            "inner join fm.user u on fm.user.userId = u.userId " +
            "where fm.family.familyId = :familyId")
    public List<FamilyMemberJoinDto> getFamilyMember(Long familyId);
}
