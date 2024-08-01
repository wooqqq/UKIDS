package com.modernfamily.ukids.domain.familyMember.model.service;

import com.modernfamily.ukids.domain.family.dto.FamilyResponseDto;
import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.family.model.repository.FamilyRepository;
import com.modernfamily.ukids.domain.familyMember.dto.FamilyMemberJoinDto;
import com.modernfamily.ukids.domain.familyMember.dto.FamilyMemberRequestDto;
import com.modernfamily.ukids.domain.familyMember.entity.FamilyMember;
import com.modernfamily.ukids.domain.familyMember.mapper.FamilyMemberMapper;
import com.modernfamily.ukids.domain.familyMember.model.repository.FamilyMemberRepository;
import com.modernfamily.ukids.domain.user.dto.CustomUserDetails;
import com.modernfamily.ukids.domain.user.entity.Role;
import com.modernfamily.ukids.domain.user.entity.User;
import com.modernfamily.ukids.domain.user.model.repository.UserRepository;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FamilyMemberServiceImpl implements FamilyMemberService{

    private final UserRepository userRepository;
    private final FamilyRepository familyRepository;
    private final FamilyMemberRepository familyMemberRepository;
    private final FamilyMemberMapper familyMemberMapper;

    @Override
    public void applyFamilyMember(FamilyMemberRequestDto familyMemberRequestDto) {
        String id = CustomUserDetails.contextGetUserId();
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));
        familyRepository.findByFamilyId(familyMemberRequestDto.getFamilyId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_FAMILY_EXCEPTION));

        familyMemberRequestDto.setUserId(user.getUserId());
        FamilyMember familyMember = familyMemberMapper.toFamilyMemberRequestEntity(familyMemberRequestDto);
        System.out.println(familyMemberRequestDto);


        familyMemberRepository.save(familyMember);
    }

    @Override
    public List<FamilyMemberJoinDto> getFamilyMember(Long familyId) {
        familyRepository.findByFamilyId(familyId)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_FAMILY_EXCEPTION));

        return familyMemberRepository.getFamilyMember(familyId);
    }
}
