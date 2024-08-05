package com.modernfamily.ukids.domain.album.dto.response;

import com.modernfamily.ukids.domain.album.entity.Album;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlbumInfoResponseDto {

    Long albumId;

    String title;

    LocalDate date;

    Long familyId;

    String familyName;

    @Builder
    private AlbumInfoResponseDto(Long albumId, String title, LocalDate date, Long familyId, String familyName) {
        this.albumId = albumId;
        this.title = title;
        this.date = date;
        this.familyId = familyId;
        this.familyName = familyName;
    }

    public static AlbumInfoResponseDto createAlbumInfoResponseDto(Album album) {
        return AlbumInfoResponseDto.builder()
                .albumId(album.getAlbumId())
                .title(album.getTitle())
                .date(album.getDate())
                .familyId(album.getFamily().getFamilyId())
                .familyName(album.getFamily().getName())
                .build();
    }

}
