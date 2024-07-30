package com.modernfamily.ukids.domain.user.model.service;

import com.modernfamily.ukids.domain.user.dto.SignUpDto;
import com.modernfamily.ukids.domain.user.dto.UserOtherDto;
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

        userRepository.save(user);

        return true;
    }

    @Override
    public boolean idExist(String id) {
        return userRepository.existsById(id);
    }

    @Override
    public boolean emailExist(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public UserOtherDto findByIdOther(String id) {

        User user = userRepository.findById(id);

        return userMapper.toUserOtherDto(user);
    }
}
