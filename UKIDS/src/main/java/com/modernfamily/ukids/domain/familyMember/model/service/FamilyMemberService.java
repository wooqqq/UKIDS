package com.modernfamily.ukids.domain.familyMember.model.service;

import com.modernfamily.ukids.domain.familyMember.dto.FamilyMemberDto;
import com.modernfamily.ukids.domain.familyMember.dto.FamilyMemberRequestDto;
import com.modernfamily.ukids.domain.familyMember.dto.FamilyMemberRoleDto;
import com.modernfamily.ukids.domain.familyMember.entity.FamilyRole;
import com.modernfamily.ukids.domain.user.entity.Role;

import java.util.List;

public interface FamilyMemberService {
    public void applyFamilyMember(FamilyMemberRequestDto familyMemberRequestDto);

    public List<FamilyMemberDto> getFamilyMember(Long familyId);

    public void approveFamilyMember(Long familyMemberId);

    public void cancelFamilyMember(Long familyMemberId);

    public void denyFamilyMember(Long familyMemberId);

    public List<FamilyMemberDto> getApprovedFamilyMember(Long familyId);

    public void setFamilyMemberRole(FamilyMemberRoleDto familyMemberRoleDto);


}
