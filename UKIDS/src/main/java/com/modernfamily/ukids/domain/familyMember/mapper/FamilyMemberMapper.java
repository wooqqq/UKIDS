package com.modernfamily.ukids.domain.familyMember.mapper;

import com.modernfamily.ukids.domain.familyMember.dto.FamilyMemberRequestDto;
import com.modernfamily.ukids.domain.familyMember.entity.FamilyMember;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FamilyMemberMapper {
    FamilyMemberMapper INSTANCE = Mappers.getMapper(FamilyMemberMapper.class);

    @Mapping(source = "userId", target = "user.userId")
    @Mapping(source = "familyId", target = "family.familyId")
    FamilyMember toFamilyMemberRequestEntity(FamilyMemberRequestDto familyMemberRequestDto);
}
