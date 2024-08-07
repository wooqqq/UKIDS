package com.modernfamily.ukids.domain.photo.dto.response;

import com.modernfamily.ukids.domain.caption.entity.Caption;
import com.modernfamily.ukids.domain.photo.entity.Photo;
import lombok.Getter;

@Getter
public class PhotoListResponseDto {

    Long photoId;

    String fileName;

    String imgUrl;

    String caption;

    private PhotoListResponseDto(Long photoId, String fileName, String imgUrl, String caption) {
        this.photoId = photoId;
        this.fileName = fileName;
        this.imgUrl = imgUrl;
        this.caption = caption;
    }

    public static PhotoListResponseDto createResponseDto(Caption caption) {
        return new PhotoListResponseDto(caption.getPhoto().getPhotoId(), caption.getPhoto().getPhotoOriginalName(), caption.getPhoto().getPhotoUrl(), caption.getContent());
    }

}
