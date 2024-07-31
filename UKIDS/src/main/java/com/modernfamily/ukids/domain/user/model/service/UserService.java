package com.modernfamily.ukids.domain.user.model.service;

import com.modernfamily.ukids.domain.user.dto.PasswordCheckDto;
import com.modernfamily.ukids.domain.user.dto.SignUpDto;
import com.modernfamily.ukids.domain.user.dto.UserDto;
import com.modernfamily.ukids.domain.user.dto.UserOtherDto;
import com.modernfamily.ukids.domain.user.entity.User;

public interface UserService {

    void signUp(SignUpDto signUpDto);

    boolean idExist(String id);
    boolean emailExist(String email);
    boolean phoneExist(String phone);

    UserDto getUser(Long userId);

    boolean pwCheck(PasswordCheckDto userDto);

    UserOtherDto findByIdOther(String id);
}
