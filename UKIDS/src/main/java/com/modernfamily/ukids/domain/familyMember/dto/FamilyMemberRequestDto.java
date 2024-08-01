package com.modernfamily.ukids.domain.familyMember.dto;

import com.modernfamily.ukids.domain.familyMember.entity.FamilyRole;
import com.modernfamily.ukids.domain.user.entity.Role;
import lombok.Data;

@Data
public class FamilyMemberRequestDto {
    private Long familyId;
    private Long userId;
    private FamilyRole role;
}
