package com.modernfamily.ukids.domain.family.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SuccessMessage {
    SUCCESS_CREATE_FAMILY("가족 생성 완료");


    private final String message;



}
