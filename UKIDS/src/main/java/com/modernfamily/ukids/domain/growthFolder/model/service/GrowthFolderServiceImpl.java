package com.modernfamily.ukids.domain.growthFolder.model.service;

import com.modernfamily.ukids.domain.growthFolder.dto.GrowthFolderRequestDto;
import com.modernfamily.ukids.domain.growthFolder.model.repository.GrowthFolderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class GrowthFolderServiceImpl implements GrowthFolderServcie{
    private final GrowthFolderRepository growthFolderRepository;

    @Override
    public void createGrowthFolder(GrowthFolderRequestDto growthFolderRequestDto) {

    }
}
