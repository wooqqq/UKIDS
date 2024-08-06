package com.modernfamily.ukids.domain.schedule.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SuccessMessage {
    
    SUCCESS_CREATE_SCHDULE("일정 등록 성공");
    
    private String message;

}
