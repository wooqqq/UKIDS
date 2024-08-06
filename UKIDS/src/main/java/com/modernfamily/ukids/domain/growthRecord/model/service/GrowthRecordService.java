package com.modernfamily.ukids.domain.growthRecord.model.service;

import com.modernfamily.ukids.domain.growthFolder.dto.GrowthFolderPaginationDto;
import com.modernfamily.ukids.domain.growthRecord.dto.*;

import java.util.List;

public interface GrowthRecordService {
    void createGrowthRecord(GrowthRecordRequestDto growthRecordRequestDto);

    void updateGrowthRecord(GrowthRecordUpdateDto growthRecordUpdate);

    GrowthRecordResponseDto getGrowthRecord(GrowthRecordDetailDto growthRecordDetailDto);

    GrowthRecordPaginationDto getGrowthRecords(Long folderId, int size, int page);

    void deleteGrowthRecord(Long recordId);
}
