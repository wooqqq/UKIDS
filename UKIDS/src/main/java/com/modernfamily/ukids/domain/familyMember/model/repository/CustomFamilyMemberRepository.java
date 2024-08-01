package com.modernfamily.ukids.domain.familyMember.model.repository;


import com.modernfamily.ukids.domain.familyMember.dto.FamilyMemberDto;
import com.modernfamily.ukids.domain.familyMember.entity.FamilyMember;

import java.util.List;

public interface CustomFamilyMemberRepository {
    public void approveFamilyMember(Long familyMemberId);

    public List<FamilyMember> getApprovedFamilyMember(Long familyId);

}
