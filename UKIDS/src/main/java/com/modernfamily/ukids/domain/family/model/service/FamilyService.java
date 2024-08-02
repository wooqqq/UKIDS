package com.modernfamily.ukids.domain.family.model.service;

import com.modernfamily.ukids.domain.family.dto.*;

import java.security.NoSuchAlgorithmException;

public interface FamilyService {

    FamilyResponseDto getFamily(Long familyId);

    void createFamily(FamilyRequestDto familyRequestDto) throws NoSuchAlgorithmException;

    FamilySearchResponseDto findByCode(String code);

    boolean checkPassword(FamilyPasswordDto familyPasswordDto);

    void updateFamily(FamilyUpdateDto familyUpdateDto);

    void deleteFamily(FamilyPasswordDto familyPasswordDto);
}
