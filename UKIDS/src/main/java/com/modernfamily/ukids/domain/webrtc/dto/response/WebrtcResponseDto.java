package com.modernfamily.ukids.domain.webrtc.dto.response;

import com.modernfamily.ukids.domain.webrtc.entity.Webrtc;
import lombok.Builder;
import lombok.Getter;

@Getter
public class WebrtcResponseDto {

    private String sessionId;

    private Long familyId;

    @Builder
    private WebrtcResponseDto(String sessionId, Long familyId) {
        this.sessionId = sessionId;
        this.familyId = familyId;
    }

    public static WebrtcResponseDto createResponseDto(Webrtc webrtc) {
        return WebrtcResponseDto.builder()
                .sessionId(webrtc.getSessionId())
                .familyId(webrtc.getFamily().getFamilyId())
                .build();
    }
}
