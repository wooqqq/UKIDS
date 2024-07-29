package com.modernfamily.ukids.domain.user.controller;

import com.modernfamily.ukids.domain.user.dto.SignUpDto;
import com.modernfamily.ukids.domain.user.model.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {


    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpDto signUpDto) {
//        System.out.println(signUpDto);
        boolean isSuccess = userService.signUp(signUpDto);

        if(isSuccess)
            return ResponseEntity.status(201).body("회원가입 완료");

        return ResponseEntity.status(500).body("회원가입 실패");
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> login(){
//
//        return null;
//    }
}
