package com.modernfamily.ukids.domain.caption.controller;

import com.modernfamily.ukids.domain.caption.dto.request.CreateCaptionRequestDto;
import com.modernfamily.ukids.domain.caption.message.SuccessMessage;
import com.modernfamily.ukids.domain.caption.model.service.CaptionService;
import com.modernfamily.ukids.global.util.HttpMethodCode;
import com.modernfamily.ukids.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/caption")
@RequiredArgsConstructor
public class CaptionController {

    private final HttpResponseUtil responseUtil;
    private final CaptionService captionService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createCaption(@RequestBody CreateCaptionRequestDto requestDto) {
        captionService.createCaption(requestDto);

        return responseUtil.createResponse(HttpMethodCode.POST, SuccessMessage.SUCCESS_CREATE_CAPTION.getMessage());
    }

}
