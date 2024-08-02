package com.modernfamily.ukids.domain.growthFolder.mapper;

import com.modernfamily.ukids.domain.growthFolder.dto.GrowthFolderRequestDto;
import com.modernfamily.ukids.domain.growthFolder.entity.GrowthFolder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GrowthFolderMapper{

    GrowthFolderMapper INSTANCE = Mappers.getMapper(GrowthFolderMapper.class);

    @Mapping(source = "familyId", target = "family.familyId")
    GrowthFolder toGrowthFolderRequestEntity(GrowthFolderRequestDto growthFolderRequestDto);

}
