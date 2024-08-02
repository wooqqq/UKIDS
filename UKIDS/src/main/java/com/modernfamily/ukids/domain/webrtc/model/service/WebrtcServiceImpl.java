package com.modernfamily.ukids.domain.webrtc.model.service;

import io.openvidu.java.client.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class WebrtcServiceImpl implements WebrtcService{

    @Value("${webrtc.openvidu.url}")
    private String OPENVIDU_URL;

    @Value("${webrtc.openvidu.secret}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @Override
    public void init(){
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    @Override
    public String initializeSessions(Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);

        return session.getSessionId();
    }
}
