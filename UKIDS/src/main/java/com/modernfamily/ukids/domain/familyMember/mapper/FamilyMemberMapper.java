package com.modernfamily.ukids.domain.familyMember.mapper;

import com.modernfamily.ukids.domain.familyMember.dto.FamilyMemberDto;
import com.modernfamily.ukids.domain.familyMember.dto.FamilyMemberRequestDto;
import com.modernfamily.ukids.domain.familyMember.entity.FamilyMember;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FamilyMemberMapper {
    FamilyMemberMapper INSTANCE = Mappers.getMapper(FamilyMemberMapper.class);

    @Mapping(source = "userId", target = "user.userId")
    @Mapping(source = "familyId", target = "family.familyId")
    FamilyMember toFamilyMemberRequestEntity(FamilyMemberRequestDto familyMemberRequestDto);

    @Mapping(source = "familyMember.user", target="userFamilyDto")
    @Named("join")
    FamilyMemberDto toFamilyMemberJoinDto(FamilyMember familyMember);

    @IterableMapping(qualifiedByName = "join")
    List<FamilyMemberDto> toFamilyMemberDtoList(List<FamilyMember> familyMembers);
}
