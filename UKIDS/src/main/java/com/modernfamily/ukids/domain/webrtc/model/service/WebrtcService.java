package com.modernfamily.ukids.domain.webrtc.model.service;

import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;

import java.util.Map;

public interface WebrtcService {
    void init();
    String initializeSessions(Map<String, Object> sessionProperties) throws OpenViduJavaClientException, OpenViduHttpException;
    String createConnection(String sessionId, Map<String, Object> connectionProperties) throws OpenViduJavaClientException, OpenViduHttpException;
}