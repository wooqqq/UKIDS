package com.modernfamily.ukids.domain.webrtc.model.service;

import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
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
    public String initializeSessions(Map<String, Object> sessionProperties) throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(sessionProperties).build();
        Session session = openvidu.createSession(properties);

        return session.getSessionId();
    }

    @Override
    public String createConnection(String sessionId, Map<String, Object> connectionProperties) throws OpenViduJavaClientException, OpenViduHttpException{
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            throw new ExceptionResponse(CustomException.NOT_FOUND_SESSION_EXCEPTION);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(connectionProperties).build();
        Connection connection = session.createConnection(properties);

        return connection.getToken();
    }
}
