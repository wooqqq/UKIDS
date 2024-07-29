package com.modernfamily.ukids.domain.photo.entity;

import com.modernfamily.ukids.domain.album.entity.Album;
import com.modernfamily.ukids.global.baseTimeEntity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Photo extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "photo_id")
    private Long photoId;

    @Column(name = "image_name", nullable = false, length = 255)
    private String imageName;

    @Column(name = "photo_url", nullable = false, length = 255)
    private String photoUrl;

    @Column(name = "is_delete", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean isDelete;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_id")
    private Album album;

    @Builder
    private Photo(String imageName, String photoUrl, boolean isDelete , Album album){
        this.imageName = imageName;
        this.photoUrl = photoUrl;
        this.isDelete = isDelete;
        this.album = album;
    }

    public static Photo createPhoto(String imageName, String photoUrl, boolean isDelete , Album album){
        return Photo.builder()
                .imageName(imageName)
                .photoUrl(photoUrl)
                .isDelete(false)
                .album(album)
                .build();
    }

}
