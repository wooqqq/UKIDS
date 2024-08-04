package com.modernfamily.ukids.domain.pictureDiary.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class PictureDiaryRequestDto {
    private Long familyId;
    private String imageName;
    private String pictureUrl;
    private String content;
    private LocalDate date;
}
