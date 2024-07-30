package com.modernfamily.ukids.domain.letter.controller;

import com.modernfamily.ukids.domain.letter.dto.LetterDto;
import com.modernfamily.ukids.domain.letter.entity.Letter;
import com.modernfamily.ukids.domain.letter.model.LetterService;
import com.modernfamily.ukids.domain.user.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/letter")
public class LetterController {

    private LetterService letterService;

    public LetterController (LetterService letterService) {
        this.letterService = letterService;
    }

    // 편지 작성
    @PostMapping("")
    public ResponseEntity<?> write(@RequestBody LetterDto letterDto) {
        // 유효성 검사 필요
        Letter savedLetter = letterService.save(letterDto);
        return new ResponseEntity<Letter>(savedLetter, HttpStatus.CREATED);
    }

    // 요청 사용자 id가 받은 편지 리스트 조회
    @GetMapping("/to")
    public ResponseEntity<?> listToUser(@RequestParam("userId") Long userId) {
        // UserService 이용해 User 찾은 후 해당 객체를 사용해 Letter 찾기
        // UserService 구현된 후 수정 (현재는 임시)
//        User toUser = userService.findByUserId(userId);
        User toUser = new User(1L, "ssafy", "1234", "김싸피", "2000-01-01", "ssafy@naver.com", "010-1234-5678", null, null, null, false);
        List<Letter> letterList = letterService.findByToUser(toUser);
        return new ResponseEntity<>(letterList, HttpStatus.OK);
    }

    // 요청 사용자 id가 보낸 편지 리스트 조회
    @GetMapping("/from")
    public ResponseEntity<?> listFromUser(@RequestParam("userId") Long userId) {
        // UserService 이용해 User 찾은 후 해당 객체를 사용해 Letter 찾기
        // UserService 구현된 후 수정 (현재는 임시)
//        User fromUser = userService.findByUserId(userId);
        User fromUser = new User(1L, "ssafy", "1234", "김싸피", "2000-01-01", "ssafy@naver.com", "010-1234-5678", null, null, null, false);
        List<Letter> letterList = letterService.findByFromUser(fromUser);
        return new ResponseEntity<>(letterList, HttpStatus.OK);
    }

    // 편지 내용 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long letterId) {
        Letter letter = letterService.findByLetterId(letterId);
        return new ResponseEntity<>(letter, HttpStatus.OK);
    }

    // 편지 삭제

    // 타임캡슐 오픈하여 편지 상태(isOpen)를 true로 변경
    // 프론트로부터 오픈 요청 받기 (편지 개수 보내기)

}
