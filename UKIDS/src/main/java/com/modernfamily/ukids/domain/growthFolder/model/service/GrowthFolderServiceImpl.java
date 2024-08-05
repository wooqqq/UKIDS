package com.modernfamily.ukids.domain.growthFolder.model.service;

import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.family.model.repository.FamilyRepository;
import com.modernfamily.ukids.domain.growthFolder.dto.GrowthFolderRequestDto;
import com.modernfamily.ukids.domain.growthFolder.dto.GrowthFolderResponseDto;
import com.modernfamily.ukids.domain.growthFolder.dto.GrowthFolderUpdateRequestDto;
import com.modernfamily.ukids.domain.growthFolder.entity.GrowthFolder;
import com.modernfamily.ukids.domain.growthFolder.mapper.GrowthFolderMapper;
import com.modernfamily.ukids.domain.growthFolder.model.repository.GrowthFolderRepository;
import com.modernfamily.ukids.domain.user.dto.CustomUserDetails;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class GrowthFolderServiceImpl implements GrowthFolderService {
    private final GrowthFolderRepository growthFolderRepository;
    private final FamilyRepository familyRepository;
    private final GrowthFolderMapper growthFolderMapper;
    @Override
    public GrowthFolderResponseDto createGrowthFolder(GrowthFolderRequestDto growthFolderRequestDto) {
        Family family = familyRepository.findByFamilyId(growthFolderRequestDto.getFamilyId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_FAMILY_EXCEPTION));

        GrowthFolder growthFolder = growthFolderRepository.save(growthFolderMapper.toGrowthFolderRequestEntity(growthFolderRequestDto));


        return growthFolderMapper.toGrowthFolderResponseDto(growthFolder);
    }

    @Override
    public List<GrowthFolderResponseDto> getGrowthFolders(Long familyId) {
        Family family = familyRepository.findByFamilyId(familyId)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_FAMILY_EXCEPTION));

        List<GrowthFolder> growthFolders = growthFolderRepository.getGrowthFolders(familyId);

        if(growthFolders == null || growthFolders.isEmpty()){
            throw new ExceptionResponse(CustomException.NOT_FOUND_GROWTHFOLDER_EXCEPTION);
        }

        // 추후 FamilyMember에 userId와 familyId를 이용해 승인된 유저인지 조회

        return growthFolderMapper.toGrowthFolderResponseDtoList(growthFolders);
    }

    @Override
    public GrowthFolderResponseDto updateGrowthFolder(GrowthFolderUpdateRequestDto growthFolderUpdateRequestDto) {
        // 추후 FamilyMember에 userId와 familyId를 이용해 승인된 유저인지 조회

        // 폴더가 있는지 확인
        GrowthFolder growthFolder = growthFolderRepository.findByFolderId(growthFolderUpdateRequestDto.getFolderId())
                        .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_GROWTHFOLDER_EXCEPTION));

        growthFolderRepository.updateGrowthFolder(growthFolderUpdateRequestDto);
        growthFolder = growthFolderRepository.findByFolderId(growthFolderUpdateRequestDto.getFolderId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_GROWTHFOLDER_EXCEPTION));
        return growthFolderMapper.toGrowthFolderResponseDto(growthFolder);
    }

    @Override
    public void deleteGrowthFolder(Long folderId) {
        // 폴더가 있는지 확인
        GrowthFolder growthFolder = growthFolderRepository.findByFolderId(folderId)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_GROWTHFOLDER_EXCEPTION));


        // userId와 familyId를 이용해 승인된 유저인지 조회해야함

        // 삭제 update
        growthFolderRepository.deleteGrowthFolder(folderId);
    }
}
