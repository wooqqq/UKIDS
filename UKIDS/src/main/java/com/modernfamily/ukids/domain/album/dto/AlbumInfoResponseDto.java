package com.modernfamily.ukids.domain.album.dto;

import com.modernfamily.ukids.domain.album.entity.Album;
import com.modernfamily.ukids.domain.family.entity.Family;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    Family family;

    @Builder
    private AlbumInfoResponseDto(Long albumId, String title, LocalDate date, Family family) {
        this.albumId = albumId;
        this.title = title;
        this.date = date;
        this.family = family;
    }

    public static AlbumInfoResponseDto createAlbumInfoResponseDro(Album album) {
        return AlbumInfoResponseDto.builder()
                .albumId(album.getAlbumId())
                .title(album.getTitle())
                .date(album.getDate())
                .family(album.getFamily())
                .build();
    }

}
