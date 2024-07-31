package com.modernfamily.ukids.domain.letter.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SuccessMessage {
    SUCCESS_DELETE_LETTER("편지 삭제 완료");

    private String message;
}
