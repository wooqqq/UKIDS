package com.modernfamily.ukids.domain.growthRecord.model.service;

import com.modernfamily.ukids.domain.growthFolder.dto.GrowthFolderPaginationDto;
import com.modernfamily.ukids.domain.growthRecord.dto.GrowthRecordPaginationDto;
import com.modernfamily.ukids.domain.growthRecord.dto.GrowthRecordRequestDto;
import com.modernfamily.ukids.domain.growthRecord.dto.GrowthRecordResponseDto;
import com.modernfamily.ukids.domain.growthRecord.dto.GrowthRecordUpdateDto;

import java.util.List;

public interface GrowthRecordService {
    void createGrowthRecord(GrowthRecordRequestDto growthRecordRequestDto);

    void updateGrowthRecord(GrowthRecordUpdateDto growthRecordUpdate);

    GrowthRecordResponseDto getGrowthRecord(Long recordId);

    GrowthRecordPaginationDto getGrowthRecords(Long folderId, int size, int page);

    void deleteGrowthRecord(Long recordId);
}
