package com.modernfamily.ukids.domain.family.model.service;

import com.modernfamily.ukids.domain.family.dto.FamilyRequestDto;
import com.modernfamily.ukids.domain.family.dto.FamilyResponseDto;
import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.family.mapper.FamilyMapper;
import com.modernfamily.ukids.domain.family.model.repository.FamilyRepository;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FamilyServiceImpl implements FamilyService{

    private final FamilyMapper familyMapper;
    private final FamilyRepository familyRepository;

    @Override
    public FamilyResponseDto getFamily(Long familyId) {
        Family family = familyRepository.findByFamilyId(familyId);

        if(family == null){
            throw new ExceptionResponse(CustomException.NOT_FOUND_FAMILY_EXCEPTION);
        }

        return familyMapper.toFamilyResponseDto(family);
    }

    @Override
    public void createFamily(FamilyRequestDto familyRequestDto){
        Family family = familyMapper.toFamilyRequestEntity(familyRequestDto);

        while(true) {
            String uuid = UUID.randomUUID().toString();
            byte[] uuidBytes = uuid.getBytes(StandardCharsets.UTF_8);
            byte[] hashBytes;

            try {
                MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
                hashBytes = messageDigest.digest(uuidBytes);
            }catch (Exception e) {
                throw new ExceptionResponse(CustomException.NOSUCH_ALGORITHM_EXCEPTION);
            }
            StringBuilder sb = new StringBuilder();
            for(int j=0; j<4; j++){
                sb.append(String.format("%02x", hashBytes[j]));
            }
            if(!familyRepository.existsByCode(sb.toString())){
               familyRequestDto.setCode(sb.toString());
               break;
            }
        }

        try{
            familyRepository.save(family);
        } catch (Exception e){
            throw new ExceptionResponse(CustomException.INPUT_FAMILY_EXCEPTION);
        }
    }

}
