package com.modernfamily.ukids.domain.growthFolder.mapper;

import com.modernfamily.ukids.domain.growthFolder.dto.GrowthFolderRequestDto;
import com.modernfamily.ukids.domain.growthFolder.dto.GrowthFolderResponseDto;
import com.modernfamily.ukids.domain.growthFolder.entity.GrowthFolder;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GrowthFolderMapper{

    GrowthFolderMapper INSTANCE = Mappers.getMapper(GrowthFolderMapper.class);

    @Mapping(source = "familyId", target = "family.familyId")
    GrowthFolder toGrowthFolderRequestEntity(GrowthFolderRequestDto growthFolderRequestDto);

    @Mapping(source = "family.familyId", target = "familyId")
    @Named("getList")
    GrowthFolderResponseDto toGrowthFolderResponseDto(GrowthFolder growthFolder);

    @IterableMapping(qualifiedByName = "getList")
    List<GrowthFolderResponseDto> toGrowthFolderResponseDtoList(List<GrowthFolder> growthFolders);
}
