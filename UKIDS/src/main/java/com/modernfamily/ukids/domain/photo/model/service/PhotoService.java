package com.modernfamily.ukids.domain.photo.model.service;

import com.modernfamily.ukids.domain.photo.dto.request.PhotoSaveRequestDto;
import com.modernfamily.ukids.domain.photo.dto.response.PhotoInfoResponseDto;

import java.io.IOException;

public interface PhotoService {

    void savePhoto(PhotoSaveRequestDto requestDto) throws IOException;

    void deletePhoto(Long photoId) throws IOException;

    PhotoInfoResponseDto getPhotoInfo(Long photoId);
}
