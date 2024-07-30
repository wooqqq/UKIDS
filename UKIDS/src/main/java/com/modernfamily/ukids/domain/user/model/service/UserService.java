package com.modernfamily.ukids.domain.user.model.service;

import com.modernfamily.ukids.domain.user.dto.SignUpDto;
import com.modernfamily.ukids.domain.user.dto.UserOtherDto;

public interface UserService {

    boolean signUp(SignUpDto signUpDto);

    boolean idExist(String id);
    boolean emailExist(String email);

    UserOtherDto findByIdOther(String id);
}
