package com.modernfamily.ukids.domain.growthFolder.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.modernfamily.ukids.global.baseTimeEntity.BaseTimeEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Data
public class GrowthFolderResponseDto {
    private Long folderId;
    private Long familyId;
    private String folderName;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    @JsonProperty("isDelete")
    private boolean isDelete;
}
