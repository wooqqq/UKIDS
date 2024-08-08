package com.modernfamily.ukids.domain.letter.model.service;

import com.modernfamily.ukids.domain.letter.dto.request.LetterCreateRequestDto;
import com.modernfamily.ukids.domain.letter.entity.Letter;
import com.modernfamily.ukids.domain.user.entity.User;

import java.util.List;
import java.util.Optional;

public interface LetterService {
    // 편지 생성
    void createLetter(LetterCreateRequestDto letterDto);

    // 편지 삭제 (논리적 삭제)
    void deleteLetter(Long letterId);

    // 로그인한 사용자가 toUser(수신인)인 경우
    List<Letter> findByToUser(User toUserId);

    // 로그인한 사용자가 fromUser(발신인)인 경우
    List<Letter> findByFromUser(User fromUserId);

    // 편지 상세 조회
    Optional<Letter> findByLetterId(Long letterId);

}
