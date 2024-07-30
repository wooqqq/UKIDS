package com.modernfamily.ukids.domain.letter.controller;

import com.modernfamily.ukids.domain.letter.model.LetterService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/letter")
public class LetterController {

    private LetterService letterService;

    public LetterController (LetterService letterService) {
        this.letterService = letterService;
    }

    // 편지 작성

    // 요청 사용자 id가 받은 편지 리스트 조회

    // 요청 사용자 id가 보낸 편지 리스트 조회

    // 편지 내용 상세 조회

    // 편지 삭제

    // 타임캡슐 오픈하여 편지 상태(isOpen)를 true로 변경
    // 프론트로부터 오픈 요청 받기 (편지 개수 보내기)

}
