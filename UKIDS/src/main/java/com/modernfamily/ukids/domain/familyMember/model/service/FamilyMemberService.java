package com.modernfamily.ukids.domain.familyMember.model.service;

import com.modernfamily.ukids.domain.familyMember.dto.FamilyMemberJoinDto;
import com.modernfamily.ukids.domain.familyMember.dto.FamilyMemberRequestDto;
import com.modernfamily.ukids.domain.familyMember.entity.FamilyMember;

import java.util.List;

public interface FamilyMemberService {
    public void applyFamilyMember(FamilyMemberRequestDto familyMemberRequestDto);

    public List<FamilyMemberJoinDto> getFamilyMember(Long familyId);



}
