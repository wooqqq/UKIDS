package com.modernfamily.ukids.domain.user.model.service;

import com.modernfamily.ukids.domain.user.dto.PasswordCheckDto;
import com.modernfamily.ukids.domain.user.dto.SignUpDto;
import com.modernfamily.ukids.domain.user.dto.UserDto;
import com.modernfamily.ukids.domain.user.dto.UserOtherDto;
import com.modernfamily.ukids.domain.user.entity.User;
import com.modernfamily.ukids.domain.user.mapper.UserMapper;
import com.modernfamily.ukids.domain.user.model.repository.UserRepository;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
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
    public void signUp(SignUpDto signUpDto) {
        String id = signUpDto.getId();
        String email = signUpDto.getEmail();
        String phone = signUpDto.getPhone();
        if(userRepository.existsById(id)){
            throw new ExceptionResponse(CustomException.DUPLICATED_ID_EXCEPTION);
        }

        if(email != null && userRepository.existsByEmail(email)){
            throw new ExceptionResponse(CustomException.DUPLICATED_EMAIL_EXCEPTION);
        }

        if(userRepository.existsByPhone(phone)){
            throw new ExceptionResponse(CustomException.DUPLICATED_NUMBER_EXCEPTION);
        }

        signUpDto.setPassword(bCryptPasswordEncoder.encode(signUpDto.getPassword()));

        User user = userMapper.toSignUpEntity(signUpDto);

        userRepository.save(user);

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
    public boolean phoneExist(String phone){
        return userRepository.existsByPhone(phone);
    }

    @Override
    public UserDto getUser(Long userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        if(user == null){
            throw new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION);
        }

        return userMapper.toUserDto(user);
    }

    @Override
    public boolean pwCheck(PasswordCheckDto userDto) {
        String id = userDto.getId();

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        return bCryptPasswordEncoder.matches(userDto.getPassword(), user.getPassword());
    }

    // 다른 domain에서 사용
    @Override
    public UserOtherDto findByIdOther(String id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        return userMapper.toUserOtherDto(user);
    }
}
