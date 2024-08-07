package com.modernfamily.ukids.domain.photo.dto.response;

import com.modernfamily.ukids.domain.album.dto.response.AlbumInfoResponseDto;
import com.modernfamily.ukids.domain.caption.entity.Caption;
import com.modernfamily.ukids.domain.family.dto.FamilyResponseDto;
import com.modernfamily.ukids.domain.photo.entity.Photo;
import lombok.Builder;
import lombok.Getter;

@Getter
public class PhotoInfoResponseDto {

    Long photoId;

    String fileName;

    String imgUrl;

    String caption;

    AlbumInfoResponseDto album;

    @Builder
    private PhotoInfoResponseDto(Long photoId, String fileName, String imgUrl, String content, AlbumInfoResponseDto album) {
        this.photoId = photoId;
        this.fileName = fileName;
        this.imgUrl = imgUrl;
        this.caption = content;
        this.album = album;
    }

    public static PhotoInfoResponseDto createResponseDto(Photo photo, FamilyResponseDto familyResponseDto, String caption) {
        return PhotoInfoResponseDto.builder()
                .photoId(photo.getPhotoId())
                .fileName(photo.getPhotoOriginalName())
                .imgUrl(photo.getPhotoUrl())
                .content(caption)
                .album(AlbumInfoResponseDto.createAlbumInfoResponseDto(photo.getAlbum(), familyResponseDto))
                .build();
    }

}
