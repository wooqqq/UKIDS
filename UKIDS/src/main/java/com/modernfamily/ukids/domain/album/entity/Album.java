package com.modernfamily.ukids.domain.album.entity;

import com.modernfamily.ukids.domain.album.dto.AlbumCreateRequestDto;
import com.modernfamily.ukids.domain.album.dto.AlbumUpdateRequestDto;
import com.modernfamily.ukids.domain.family.entity.Family;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.Date;

@Entity
@NoArgsConstructor( access = AccessLevel.PROTECTED )
@Getter
public class Album{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "album_id")
    private Long albumId;

    @Column(name = "date", columnDefinition = "DATE", nullable = false)
    private LocalDate date;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "family_id")
    private Family family;

    private Album(LocalDate date, String title, Family family){
        this.date = date;
        this.title = title;
        this.family = family;
    }

    @Builder
    private Album(Long albumId, LocalDate date, String title, Family family){
        this.albumId = albumId;
        this.date = date;
        this.title = title;
        this.family = family;
    }

    public static Album createAlbum(AlbumCreateRequestDto requestDto, Family family){
        return new Album(requestDto.getDate(), requestDto.getTitle(), family);
    }

    public static Album updateAlbum(AlbumUpdateRequestDto requestDto, Family family){
        return Album.builder()
                .albumId(requestDto.getAlbumId())
                .title(requestDto.getTitle())
                .date(requestDto.getDate())
                .family(family)
                .build();
    }
}
