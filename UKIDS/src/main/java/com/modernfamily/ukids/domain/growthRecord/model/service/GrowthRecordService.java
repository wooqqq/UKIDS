package com.modernfamily.ukids.domain.growthRecord.model.service;

import com.modernfamily.ukids.domain.growthRecord.dto.GrowthRecordRequestDto;
import com.modernfamily.ukids.domain.growthRecord.dto.GrowthRecordResponseDto;
import com.modernfamily.ukids.domain.growthRecord.dto.GrowthRecordUpdateDto;

import java.util.List;

public interface GrowthRecordService {
    GrowthRecordResponseDto createGrowthRecord(GrowthRecordRequestDto growthRecordRequestDto);

    GrowthRecordResponseDto updateGrowthRecord(GrowthRecordUpdateDto growthRecordUpdate);

    GrowthRecordResponseDto getGrowthRecord(Long recordId);

    List<GrowthRecordResponseDto> getGrowthRecords(Long folderId);

    void deleteGrowthRecord(Long recordId);
}
