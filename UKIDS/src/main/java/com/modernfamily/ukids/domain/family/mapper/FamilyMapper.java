package com.modernfamily.ukids.domain.family.mapper;

import com.modernfamily.ukids.domain.family.dto.FamilyRequestDto;
import com.modernfamily.ukids.domain.family.dto.FamilyResponseDto;
import com.modernfamily.ukids.domain.family.entity.Family;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FamilyMapper {

    FamilyMapper INSTANCE = Mappers.getMapper(FamilyMapper.class);

    FamilyResponseDto toFamilyResponseDto(Family family);

    Family toFamilyRequestEntity(FamilyRequestDto dto);
}
