package com.modernfamily.ukids.domain.pictureDiary.model.service;

import com.modernfamily.ukids.domain.pictureDiary.dto.PictureDiaryRequestDto;
import com.modernfamily.ukids.domain.pictureDiary.dto.PictureDiaryResponseDto;
import com.modernfamily.ukids.domain.pictureDiary.dto.PictureDiaryUpdateDto;

import java.time.LocalDate;
import java.util.List;

public interface PictureDiaryService {

    void createPictureDiary(PictureDiaryRequestDto pictureDiaryRequestDto);

    PictureDiaryResponseDto getPictureDiary(Long pictureDiaryId);

    List<PictureDiaryResponseDto> getPictureDiariesByDate(Long familyId, LocalDate date);
    List<PictureDiaryResponseDto> getPictureDiariesAll(Long familyId);

    void deletePictureDiary(Long pictureDiaryId);

    void updatePictureDiary(PictureDiaryUpdateDto pictureDiaryUpdateDto);
}
