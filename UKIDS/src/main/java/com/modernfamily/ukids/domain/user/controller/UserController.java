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
        boolean isSuccess = userService.signUp(signUpDto);

        if(isSuccess)
            return ResponseEntity.status(201).body("회원가입 완료");

        return ResponseEntity.status(500).body("회원가입 실패");
    }

    @GetMapping("/user/id/{id}")
    public ResponseEntity<String> idExist(@PathVariable("id") String id){
        boolean idCheck = userService.idExist(id);

        if(idCheck)
            return ResponseEntity.status(400).body("id 중복");

        return ResponseEntity.ok().body("id 생성 가능");
    }

    @GetMapping("/user/email/{email}")
    public ResponseEntity<String> emailExist(@PathVariable("email") String email){
        boolean idCheck = userService.emailExist(email);

        if(idCheck)
            return ResponseEntity.status(400).body("email 중복");

        return ResponseEntity.ok().body("email 생성 가능");
    }

    @GetMapping("/test")
    public ResponseEntity<?> test(@RequestParam String id) {
        System.out.println("test: " + userService.findByIdOther(id));

        return null;
    }

}
