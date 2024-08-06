package com.modernfamily.ukids.domain.caption.model.service;

import com.modernfamily.ukids.domain.caption.dto.request.CaptionCreateRequestDto;
import com.modernfamily.ukids.domain.caption.dto.request.CaptionUpdateRequestDto;

public interface CaptionService {

    void createCaption(CaptionCreateRequestDto requestDto);

    void updateCaption(CaptionUpdateRequestDto requestDto);
}
