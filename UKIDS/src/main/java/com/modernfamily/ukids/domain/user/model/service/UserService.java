package com.modernfamily.ukids.domain.user.model.service;

import com.modernfamily.ukids.domain.user.dto.SignUpDto;

public interface UserService {

    boolean signUp(SignUpDto signUpDto);
}
