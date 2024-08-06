package com.modernfamily.ukids.domain.photo.dto.response;

import com.modernfamily.ukids.domain.photo.entity.Photo;
import lombok.Getter;

@Getter
public class PhotoListResponseDto {

    Long photoId;

    String fileName;

    String imgUrl;

    private PhotoListResponseDto(Long photoId, String fileName, String imgUrl) {
        this.photoId = photoId;
        this.fileName = fileName;
        this.imgUrl = imgUrl;
    }

    public static PhotoListResponseDto createResponseDto(Photo photo) {
        return new PhotoListResponseDto(photo.getPhotoId(), photo.getPhotoOriginalName(), photo.getPhotoUrl());
    }

}
