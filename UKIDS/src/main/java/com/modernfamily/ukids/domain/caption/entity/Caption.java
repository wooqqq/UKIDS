package com.modernfamily.ukids.domain.caption.entity;

import com.modernfamily.ukids.domain.photo.entity.Photo;
import com.modernfamily.ukids.global.baseTimeEntity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Caption extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="caption_id")
    private Long captionId;

    @Column(name="content", nullable = false, length = 255)
    private String content;

    @Column(name = "is_delete", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean isDelete;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "photo_id")
    private Photo photo;

    private Caption(String content, boolean isDelete, Photo photo) {
        this.content = content;
        this.isDelete = isDelete;
        this.photo = photo;
    }

    public static Caption createCaption(String content, Photo photo) {
        return new Caption(content, false, photo);
    }
}

