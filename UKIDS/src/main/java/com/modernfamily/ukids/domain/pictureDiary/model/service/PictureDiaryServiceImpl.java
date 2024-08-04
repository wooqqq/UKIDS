package com.modernfamily.ukids.domain.pictureDiary.model.service;

import com.modernfamily.ukids.domain.family.model.repository.FamilyRepository;
import com.modernfamily.ukids.domain.pictureDiary.dto.PictureDiaryRequestDto;
import com.modernfamily.ukids.domain.pictureDiary.dto.PictureDiaryResponseDto;
import com.modernfamily.ukids.domain.pictureDiary.dto.PictureDiaryUpdateDto;
import com.modernfamily.ukids.domain.pictureDiary.entity.PictureDiary;
import com.modernfamily.ukids.domain.pictureDiary.mapper.PictureDiaryMapper;
import com.modernfamily.ukids.domain.pictureDiary.model.repository.CustomPictureDiaryRepository;
import com.modernfamily.ukids.domain.pictureDiary.model.repository.PictureDiaryRepository;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PictureDiaryServiceImpl implements PictureDiaryService{

    private final PictureDiaryRepository pictureDiaryRepository;
    private final CustomPictureDiaryRepository customPictureDiaryRepository;
    private final PictureDiaryMapper pictureDiaryMapper;

    private final FamilyRepository familyRepository;

    @Override
    public void createPictureDiary(PictureDiaryRequestDto pictureDiaryRequestDto) {
        familyRepository.findByFamilyId(pictureDiaryRequestDto.getFamilyId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_FAMILY_EXCEPTION));

        // 추후 familyId와 현재 로그인 정보를 확인해서 가족방에 속해있는지 확인


        pictureDiaryRepository.save(pictureDiaryMapper.toPictureDiaryRequestEntity(pictureDiaryRequestDto));

    }

    @Override
    public PictureDiaryResponseDto getPictureDiary(Long pictureDiaryId) {
        PictureDiary pictureDiary = pictureDiaryRepository.findByPictureDiaryId(pictureDiaryId)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PICTUREDIARY_EXCEPTION));

        return pictureDiaryMapper.toPictureDiaryResponseDto(pictureDiary);
    }

    @Override
    public List<PictureDiaryResponseDto> getPictureDiariesByDate(Long familyId, LocalDate date) {
        familyRepository.findByFamilyId(familyId)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_FAMILY_EXCEPTION));

        List<PictureDiary> pictureDiaries = customPictureDiaryRepository.getPictureDiariesByDate(familyId, date);
        return pictureDiaryMapper.toPictureDiaryResponseDtoList(pictureDiaries);
    }

    @Override
    public List<PictureDiaryResponseDto> getPictureDiariesAll(Long familyId) {
        familyRepository.findByFamilyId(familyId)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_FAMILY_EXCEPTION));

        List<PictureDiary> pictureDiaries = customPictureDiaryRepository.getPictureDiariesAll(familyId);
        return pictureDiaryMapper.toPictureDiaryResponseDtoList(pictureDiaries);
    }

    @Override
    public void deletePictureDiary(Long pictureDiaryId) {
        PictureDiary pictureDiary = pictureDiaryRepository.findByPictureDiaryId(pictureDiaryId)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PICTUREDIARY_EXCEPTION));

        // 추후 가족방에 속한 사람인지 검사

        customPictureDiaryRepository.deletePictureDiary(pictureDiaryId);
    }

    @Override
    public void updatePictureDiary(PictureDiaryUpdateDto pictureDiaryUpdateDto) {
        PictureDiary pictureDiary = pictureDiaryRepository.findByPictureDiaryId(pictureDiaryUpdateDto.getPictureDiaryId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PICTUREDIARY_EXCEPTION));

        // 추후 가족방에 속한 사람인지 검사

        customPictureDiaryRepository.updatePictureDiary(pictureDiaryMapper.toPictureDiaryUpdateEntity(pictureDiaryUpdateDto));
    }
}
