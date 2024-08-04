package com.modernfamily.ukids.domain.album.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SuccessMessage {

    SUCCESS_CREATE_ALBUM("앨범 생성 완료");

    private String message;


}
