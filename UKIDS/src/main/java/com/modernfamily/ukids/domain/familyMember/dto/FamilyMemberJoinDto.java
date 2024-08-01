package com.modernfamily.ukids.domain.familyMember.dto;

import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.user.entity.User;
import lombok.Data;

@Data
public class FamilyMemberJoinDto {

    public FamilyMemberJoinDto(Long familyMemberId, User user, Family family) {
        this.familyMemberId = familyMemberId;
        this.user = user;
        this.family = family;
    }

    private Long familyMemberId;
    private User user;
    private Family family;
}
