package com.modernfamily.ukids.domain.album.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FamilyAlbumPagenationResponseDto {

    int size;

    int currentPage;

    int totalPage;

    List<FamilyAlbumListResponseDto> albumResponseDtoList;

    @Builder
    private FamilyAlbumPagenationResponseDto(List<FamilyAlbumListResponseDto> albumResponseDtoList, int size, int currentPage, int totalPage) {
        this.albumResponseDtoList = albumResponseDtoList;
        this.size = size;
        this.currentPage = currentPage;
        this.totalPage = totalPage;
    }

    public static FamilyAlbumPagenationResponseDto createResponseDto(List<FamilyAlbumListResponseDto> albumResponseDtoList, int size, int currentPage, int totalPage) {
        return FamilyAlbumPagenationResponseDto.builder()
                .albumResponseDtoList(albumResponseDtoList)
                .size(size)
                .currentPage(currentPage)
                .totalPage(totalPage)
                .build();
    }

}
