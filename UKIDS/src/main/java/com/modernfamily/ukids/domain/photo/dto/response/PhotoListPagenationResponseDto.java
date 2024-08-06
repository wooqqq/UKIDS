package com.modernfamily.ukids.domain.photo.dto.response;

import com.modernfamily.ukids.domain.album.dto.response.AlbumInfoResponseDto;
import com.modernfamily.ukids.domain.album.entity.Album;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class PhotoListPagenationResponseDto {

    int size;

    int currentPage;

    int totalPage;

    AlbumInfoResponseDto album;

    List<PhotoListResponseDto> photoList;

    @Builder
    private PhotoListPagenationResponseDto(int size, int currentPage, int totalPage, AlbumInfoResponseDto album, List<PhotoListResponseDto> photoList) {
        this.size = size;
        this.currentPage = currentPage;
        this.totalPage = totalPage;
        this.album = album;
        this.photoList = photoList;
    }

    public static PhotoListPagenationResponseDto createResponseDto(int size, int currentPage, int totalPage, Album album, List<PhotoListResponseDto> photoList) {
        return PhotoListPagenationResponseDto.builder()
                .size(size)
                .currentPage(currentPage)
                .totalPage(totalPage)
                .album(AlbumInfoResponseDto.createAlbumInfoResponseDto(album))
                .photoList(photoList)
                .build();
    }

}
