package com.modernfamily.ukids.domain.pictureDiary.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class PictureDiaryUpdateDto {
    private Long pictureDiaryId;
    private Long familyId;
    private String pictureUrl;
    private String imageName;
    private LocalDate date;
    private String content;
}
