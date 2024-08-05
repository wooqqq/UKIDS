package com.modernfamily.ukids.domain.growthFolder.model.service;

import com.modernfamily.ukids.domain.growthFolder.dto.GrowthFolderRequestDto;
import com.modernfamily.ukids.domain.growthFolder.dto.GrowthFolderResponseDto;
import com.modernfamily.ukids.domain.growthFolder.dto.GrowthFolderUpdateRequestDto;

import java.util.List;

public interface GrowthFolderService {

    GrowthFolderResponseDto createGrowthFolder(GrowthFolderRequestDto growthFolderRequestDto);

    List<GrowthFolderResponseDto> getGrowthFolders(Long familyId);

    GrowthFolderResponseDto updateGrowthFolder(GrowthFolderUpdateRequestDto growthFolderUpdateRequestDto);

    void deleteGrowthFolder(Long folderId);
}
