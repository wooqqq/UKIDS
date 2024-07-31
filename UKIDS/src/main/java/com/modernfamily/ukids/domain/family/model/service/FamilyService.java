package com.modernfamily.ukids.domain.family.model.service;

import com.modernfamily.ukids.domain.family.dto.FamilyRequestDto;
import com.modernfamily.ukids.domain.family.dto.FamilyResponseDto;

import java.security.NoSuchAlgorithmException;

public interface FamilyService {

    public FamilyResponseDto getFamily(Long familyId);

    public void createFamily(FamilyRequestDto familyRequestDto) throws NoSuchAlgorithmException;
}
