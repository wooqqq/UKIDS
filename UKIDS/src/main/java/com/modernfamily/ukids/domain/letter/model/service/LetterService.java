package com.modernfamily.ukids.domain.letter.model.service;

import com.modernfamily.ukids.domain.letter.dto.request.LetterCreateRequestDto;
import com.modernfamily.ukids.domain.letter.dto.response.LetterListPagenationResponseDto;
import com.modernfamily.ukids.domain.letter.dto.response.LetterResponseDto;


public interface LetterService {
    // 편지 생성
    void createLetter(LetterCreateRequestDto letterDto);

    // 편지 삭제 (논리적 삭제)
    void deleteLetter(Long letterId);

    // 로그인한 사용자가 toUser(수신인)인 경우
    LetterListPagenationResponseDto getLetterListByToUser(int size, int page);

    // 로그인한 사용자가 fromUser(발신인)인 경우
    LetterListPagenationResponseDto getLetterListByFromUser(int size, int page);

    // 편지 상세 조회
    LetterResponseDto getLetterById(Long letterId);

}
