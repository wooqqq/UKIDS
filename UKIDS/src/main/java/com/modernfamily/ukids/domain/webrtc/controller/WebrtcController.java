package com.modernfamily.ukids.domain.webrtc.controller;

import com.modernfamily.ukids.domain.webrtc.model.service.WebrtcService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/call")
@RequiredArgsConstructor
public class WebrtcController {

    private final WebrtcService webrtcService;


}
