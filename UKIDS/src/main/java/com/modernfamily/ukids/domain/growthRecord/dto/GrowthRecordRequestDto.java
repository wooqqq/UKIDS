package com.modernfamily.ukids.domain.growthRecord.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class GrowthRecordRequestDto {
    private Long folderId;
    private Long writerId;
    private String title;
    private String childName;
    private String content;
    private LocalDate date;
}
