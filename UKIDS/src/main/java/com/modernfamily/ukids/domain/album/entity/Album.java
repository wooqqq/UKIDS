package com.modernfamily.ukids.domain.album.entity;

import com.modernfamily.ukids.domain.family.entity.Family;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

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

    public static Album createAlbum(LocalDate date, String title, Family family){
        return new Album(date, title, family);
    }
}
