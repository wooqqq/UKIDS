package com.modernfamily.ukids.domain.photo.model.service;

import com.modernfamily.ukids.domain.photo.dto.request.PhotoSaveRequestDto;

import java.io.IOException;

public interface PhotoService {
    void savePhoto(PhotoSaveRequestDto requestDto) throws IOException;
}
