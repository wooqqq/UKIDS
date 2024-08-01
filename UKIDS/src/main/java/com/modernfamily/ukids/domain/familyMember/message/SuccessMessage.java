package com.modernfamily.ukids.domain.familyMember.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SuccessMessage {
    SUCCESS_APPLY_FAMILY_MEMBER("가족 신청 완료");


    private final String message;



}
