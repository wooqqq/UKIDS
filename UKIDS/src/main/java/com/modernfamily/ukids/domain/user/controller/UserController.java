package com.modernfamily.ukids.domain.user.controller;

import com.modernfamily.ukids.domain.user.dto.SignUpDto;
import com.modernfamily.ukids.domain.user.model.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {


    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody SignUpDto signUpDto, @RequestHeader("Authorization") String token) {
//        System.out.println(signUpDto);
        boolean isSuccess = userService.signUp(signUpDto);

        if(isSuccess)
            return ResponseEntity.status(201).body("회원가입 완료");

        return ResponseEntity.status(500).body("회원가입 실패");
    }

    @GetMapping("/sss")
    public ResponseEntity<?> login(){

        return ResponseEntity.ok().body("인증");
    }
}
