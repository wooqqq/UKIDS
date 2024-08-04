package com.modernfamily.ukids.domain.album.dto;

import com.modernfamily.ukids.domain.album.entity.Album;
import com.modernfamily.ukids.domain.family.entity.Family;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlbumInfoListResponseDto {

    Long albumId;

    String title;

    LocalDate date;

    private AlbumInfoListResponseDto(Long albumId, String title, LocalDate date) {
        this.albumId = albumId;
        this.title = title;
        this.date = date;
    }

    public static AlbumInfoListResponseDto createResponseDro(Album album) {
        return new AlbumInfoListResponseDto(album.getAlbumId(), album.getTitle(), album.getDate());
    }

}
