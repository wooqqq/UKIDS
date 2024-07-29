package com.modernfamily.ukids.domain.user.model.service;

import com.modernfamily.ukids.domain.user.dto.SignUpDto;
import com.modernfamily.ukids.domain.user.entity.User;
import com.modernfamily.ukids.domain.user.mapper.UserMapper;
import com.modernfamily.ukids.domain.user.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServIceImpl implements UserService{

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public boolean signUp(SignUpDto signUpDto) {
        String id = signUpDto.getId();

        if(userRepository.existsById(id))
            return false;

        signUpDto.setPassword(bCryptPasswordEncoder.encode(signUpDto.getPassword()));

        User user = userMapper.toSignUpEntity(signUpDto);
//        System.out.println("user: " + user);
        userRepository.save(user);

        return true;
    }
}
