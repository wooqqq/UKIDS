package com.modernfamily.ukids.domain.webrtc.model.service;

import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.family.model.repository.FamilyRepository;
import com.modernfamily.ukids.domain.webrtc.dto.response.WebrtcResponseDto;
import com.modernfamily.ukids.domain.webrtc.entity.Webrtc;
import com.modernfamily.ukids.domain.webrtc.model.repository.WebrtcRepository;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class WebrtcServiceImpl implements WebrtcService{

    @Value("${webrtc.openvidu.url}")
    private String OPENVIDU_URL;

    @Value("${webrtc.openvidu.secret}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;
    private final WebrtcRepository webrtcRepository;
    private final FamilyRepository familyRepository;

    @Override
    public void init(){
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    @Override
    public String initializeSessions(Map<String, Object> sessionProperties) throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(sessionProperties).build();
        Session session = openvidu.createSession(properties);

        return session.getSessionId();
    }

    @Override
    public String createConnection(String sessionId, Map<String, Object> connectionProperties) throws OpenViduJavaClientException, OpenViduHttpException{

        openvidu.fetch();

        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            throw new ExceptionResponse(CustomException.NOT_FOUND_SESSION_EXCEPTION);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(connectionProperties).build();
        Connection connection = session.createConnection(properties);

        return connection.getToken();
    }

    @Override
    public void createWebrtcChatRoom(String sessionId, Long familyId) {
        Family family = familyRepository.findByFamilyId(familyId)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_FAMILY_EXCEPTION));

        Webrtc webrtc = Webrtc.createWebrtc(sessionId, family);

        webrtcRepository.save(webrtc);
    }

    @Override
    public WebrtcResponseDto getWebrtcByFamilyId(Map<String, Long> payload) {
        Long familyId = payload.get("familyId");
        Webrtc webrtc = webrtcRepository.findByFamily_FamilyId(familyId).get();

        return WebrtcResponseDto.createResponseDto(webrtc);
    }
}
