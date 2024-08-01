package com.modernfamily.ukids.domain.family.mapper;

import com.modernfamily.ukids.domain.family.dto.FamilyRequestDto;
import com.modernfamily.ukids.domain.family.dto.FamilyResponseDto;
import com.modernfamily.ukids.domain.family.dto.FamilySearchResponseDto;
import com.modernfamily.ukids.domain.family.dto.FamilyUpdateDto;
import com.modernfamily.ukids.domain.family.entity.Family;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FamilyMapper {

    FamilyMapper INSTANCE = Mappers.getMapper(FamilyMapper.class);

    FamilyResponseDto toFamilyResponseDto(Family family);

    @Mapping(source = "representative", target = "user.userId")
    Family toFamilyRequestEntity(FamilyRequestDto dto);

    @Mapping(source = "representative", target = "user.userId")
    Family toFamilyUpdateEntity(FamilyUpdateDto dto);

    @Mapping(source = "user", target = "userFamilyDto")
    FamilySearchResponseDto toFamilySearchDto(Family family);


}
