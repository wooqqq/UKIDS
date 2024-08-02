package com.modernfamily.ukids.domain.webrtc.controller;

import com.modernfamily.ukids.domain.webrtc.model.service.WebrtcService;
import com.modernfamily.ukids.global.util.HttpMethodCode;
import com.modernfamily.ukids.global.util.HttpResponseUtil;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/call")
@RequiredArgsConstructor
public class WebrtcController {

    private final HttpResponseUtil responseUtil;
    private final WebrtcService webrtcService;

    @PostConstruct
    public void init() {
        webrtcService.init();
    }

    @PostMapping("/sessions")
    public ResponseEntity<?> initializeSessions(@RequestBody(required = false) Map<String, Object> sessionProperties) {
        String sessionId = webrtcService.initializeSessions(sessionProperties);

        return responseUtil.createResponse(HttpMethodCode.POST, sessionId);
    }


}
