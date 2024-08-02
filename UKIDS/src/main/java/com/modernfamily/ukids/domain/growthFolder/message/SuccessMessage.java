package com.modernfamily.ukids.domain.growthFolder.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SuccessMessage {
    SUCCESS_CREATE_USER("회원 생성 완료");


    private final String message;



}
