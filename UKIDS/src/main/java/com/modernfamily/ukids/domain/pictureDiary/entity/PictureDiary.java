package com.modernfamily.ukids.domain.pictureDiary.entity;

import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.global.baseTimeEntity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Entity
@Getter
public class PictureDiary extends BaseTimeEntity {

    public PictureDiary() {
    }

    @Builder
    public PictureDiary(Long pictureDiaryId, Family family, String imageName, String pictureUrl, String content, LocalDate date, boolean isDelete) {
        this.pictureDiaryId = pictureDiaryId;
        this.family = family;
        this.imageName = imageName;
        this.pictureUrl = pictureUrl;
        this.content = content;
        this.date = date;
        this.isDelete = isDelete;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pictureDiaryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "family_id")
    private Family family;

    @Column(nullable = false)
    private String imageName;
    @Column(nullable = false)
    private String pictureUrl;
    @Column(length = 3000)
    private String content;
    private LocalDate date;

    @ColumnDefault("false")
    @Column(columnDefinition = "TINYINT(1)")
    private boolean isDelete;

    @PrePersist
    protected void onDate() {
        if(this.date == null){
            this.date = LocalDate.now();
        }
    }
}
