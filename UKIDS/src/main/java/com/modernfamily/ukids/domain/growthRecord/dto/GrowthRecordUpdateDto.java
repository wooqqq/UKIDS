package com.modernfamily.ukids.domain.growthRecord.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class GrowthRecordUpdateDto {
    private Long recordId;
    private String title;
    private String content;
    private LocalDate date;
    private String imageName;
    private String imageUrl;
}
