package com.modernfamily.ukids.domain.user.controller;

import com.modernfamily.ukids.domain.user.dto.CustomUserDetails;
import com.modernfamily.ukids.domain.user.dto.PasswordCheckDto;
import com.modernfamily.ukids.domain.user.dto.SignUpDto;
import com.modernfamily.ukids.domain.user.dto.UserDto;
import com.modernfamily.ukids.domain.user.message.SuccessMessage;
import com.modernfamily.ukids.domain.user.model.service.UserService;
import com.modernfamily.ukids.global.jwt.JWTUtil;
import com.modernfamily.ukids.global.util.HttpMethodCode;
import com.modernfamily.ukids.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@Controller
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final HttpResponseUtil responseUtil;
    private final UserService userService;
    private final JWTUtil jwtUtil;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody SignUpDto signUpDto) {
        userService.signUp(signUpDto);

        return responseUtil.createResponse(HttpMethodCode.POST, SuccessMessage.SUCCESS_CREATE_USER.getMessage());
    }

    // 회원정보 조회
    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getUser(@PathVariable("userId") Long userId) {
        UserDto userDto = userService.getUser(userId);

        return responseUtil.createResponse(HttpMethodCode.GET, userDto);
    }

    // id 중복검사
    @GetMapping("/id/{id}")
    public ResponseEntity<Map<String, Object>> idExist(@PathVariable("id") String id){

        boolean idCheck = userService.idExist(id);

        if(idCheck)
            return responseUtil.createResponse(HttpMethodCode.GET, SuccessMessage.SUCCESS_ID_EXIST.getMessage());

        return responseUtil.createResponse(HttpMethodCode.GET, SuccessMessage.SUCCESS_ID_NON_EXIST.getMessage());
    }

    // 이메일 중복검사
    @GetMapping("/email/{email}")
    public ResponseEntity<Map<String, Object>> emailExist(@PathVariable("email") String email){
        System.out.println("email: " + email);
        boolean emailCheck = userService.emailExist(email);

        if(emailCheck)
            return responseUtil.createResponse(HttpMethodCode.GET, SuccessMessage.SUCCESS_EMAIL_EXIST.getMessage());

        return responseUtil.createResponse(HttpMethodCode.GET, SuccessMessage.SUCCESS_EMAIL_NON_EXIST.getMessage());
    }

    // 전화번호 중복검사
    @GetMapping("/phone/{phone}")
    public ResponseEntity<Map<String, Object>> phoneExist(@PathVariable("phone") String phone){
        boolean phoneCheck = userService.phoneExist(phone);

        if(phoneCheck)
            return responseUtil.createResponse(HttpMethodCode.GET, SuccessMessage.SUCCESS_PHONE_EXIST.getMessage());

        return responseUtil.createResponse(HttpMethodCode.GET, SuccessMessage.SUCCESS_PHONE_NON_EXIST.getMessage());
    }

    // 회원 수정 시 비밀번호 체크
    @PostMapping("/pwcheck")
    public ResponseEntity<Map<String, Object>> pwCheck(@RequestBody PasswordCheckDto userDto){
        userDto.setId(CustomUserDetails.contextGetUserId());

        boolean pwCheck = userService.pwCheck(userDto);

        if(pwCheck)
            return responseUtil.createResponse(HttpMethodCode.POST, SuccessMessage.SUCCESS_PASSWORD_SAME);

        return responseUtil.createResponse(HttpMethodCode.POST, SuccessMessage.SUCCESS_PASSWORD_DISCORD);
    }

//    @PutMapping("/user")
//    public ResponseEntity<Map<String, Object>> updateUser(@RequestBody UserDto userDto){
//
//    }
}