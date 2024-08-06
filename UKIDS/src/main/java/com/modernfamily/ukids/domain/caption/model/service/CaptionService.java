package com.modernfamily.ukids.domain.caption.model.service;

import com.modernfamily.ukids.domain.caption.dto.request.CreateCaptionRequestDto;

public interface CaptionService {

    void createCaption(CreateCaptionRequestDto requestDto);
}
