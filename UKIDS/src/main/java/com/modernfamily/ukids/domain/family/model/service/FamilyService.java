package com.modernfamily.ukids.domain.family.model.service;

import com.modernfamily.ukids.domain.family.dto.*;

import java.security.NoSuchAlgorithmException;

public interface FamilyService {

    public FamilyResponseDto getFamily(Long familyId);

    public void createFamily(FamilyRequestDto familyRequestDto) throws NoSuchAlgorithmException;

    public FamilySearchResponseDto findByCode(String code);

    public boolean checkPassword(FamilyPasswordDto familyPasswordDto);

    public void updateFamily(FamilyUpdateDto familyUpdateDto);

    public void deleteFamily(FamilyPasswordDto familyPasswordDto);
}
