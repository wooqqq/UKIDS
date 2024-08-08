package com.modernfamily.ukids.domain.letter.model.service;

import com.modernfamily.ukids.domain.letter.dto.request.LetterCreateRequestDto;
import com.modernfamily.ukids.domain.letter.dto.response.LetterListPagenationResponseDto;
import com.modernfamily.ukids.domain.letter.dto.response.LetterListResponseDto;
import com.modernfamily.ukids.domain.letter.dto.response.LetterResponseDto;
import com.modernfamily.ukids.domain.letter.entity.Letter;
import com.modernfamily.ukids.domain.letter.mapper.LetterMapper;
import com.modernfamily.ukids.domain.letter.model.repository.LetterRepository;
import com.modernfamily.ukids.domain.tree.entity.Tree;
import com.modernfamily.ukids.domain.tree.model.repository.TreeRepository;
import com.modernfamily.ukids.domain.user.dto.CustomUserDetails;
import com.modernfamily.ukids.domain.user.entity.User;
import com.modernfamily.ukids.domain.user.mapper.UserMapper;
import com.modernfamily.ukids.domain.user.model.repository.UserRepository;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class LetterServiceImpl implements LetterService {

    private final LetterRepository letterRepository;
    private final TreeRepository treeRepository;
    private final UserRepository userRepository;
    private final LetterMapper letterMapper;
    private final UserMapper userMapper;

    @Override
    public void createLetter(LetterCreateRequestDto letterDto) {
        String id = CustomUserDetails.contextGetUserId();
        User fromUser = userRepository.findById(id)
                .orElseThrow(()-> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        User toUser = userRepository.findByUserId(letterDto.getToUserId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        Tree tree = treeRepository.findByFamily_FamilyId(letterDto.getFamilyId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_TREE_EXCEPTION));

        Letter createdLetter = Letter.createLetter(letterDto.getContent(), tree, fromUser, toUser);

        letterRepository.save(createdLetter);
    }

    @Override
    public void deleteLetter(Long letterId) {
        String id = CustomUserDetails.contextGetUserId();
        User loginUser = userRepository.findById(id)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        Letter letter = letterRepository.findByLetterId(letterId)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_LETTER_EXCEPTION));

        if (!letter.getFromUser().equals(loginUser) && !letter.getToUser().equals(loginUser))
            throw new ExceptionResponse(CustomException.NO_AUTH_OF_LETTER_EXCEPTION);

        letter.deleteLetter();

        letterRepository.save(letter);
    }

    // 로그인한 사용자가 toUser(수신인)인 경우
    @Override
    public LetterListPagenationResponseDto getLetterListByToUser(int size, int page) {
        String id = CustomUserDetails.contextGetUserId();
        User loginUser = userRepository.findById(id).orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        Pageable pageable = PageRequest.of(--page, size);
        Page<Letter> letterPage = letterRepository.findByToUserAndIsOpen(loginUser, true, pageable);

        List<Letter> letterList = letterPage.getContent();
        List<LetterListResponseDto> responseDtoList = new ArrayList<>();

        for (Letter letter : letterList) {
            responseDtoList.add(LetterListResponseDto.createResponseDto(letter));
        }

        LetterListPagenationResponseDto pagenationResponseDto = LetterListPagenationResponseDto
                .createResponseDto(letterPage.getNumberOfElements(), letterPage.getNumber() + 1,
                        letterPage.getTotalPages(), letterPage.getTotalElements(), responseDtoList, userMapper.toUserDto(loginUser));

        return pagenationResponseDto;
    }

    // 로그인한 사용자가 fromUser(발신인)인 경우
    @Override
    public LetterListPagenationResponseDto getLetterListByFromUser(int size, int page) {
        String id = CustomUserDetails.contextGetUserId();
        User loginUser = userRepository.findById(id).orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        Pageable pageable = PageRequest.of(--page, size);
        Page<Letter> letterPage = letterRepository.findByFromUser(loginUser, pageable);

        List<Letter> letterList = letterPage.getContent();
        List<LetterListResponseDto> responseDtoList = new ArrayList<>();

        for (Letter letter : letterList) {
            responseDtoList.add(LetterListResponseDto.createResponseDto(letter));
        }

        LetterListPagenationResponseDto pagenationResponseDto = LetterListPagenationResponseDto
                .createResponseDto(letterPage.getNumberOfElements(), letterPage.getNumber() + 1,
                        letterPage.getTotalPages(), letterPage.getTotalElements(), responseDtoList, userMapper.toUserDto(loginUser));

        return pagenationResponseDto;
    }

    // 편지 상세 조회
    @Override
    public LetterResponseDto getLetterById(Long letterId) {
        String id = CustomUserDetails.contextGetUserId();
        User loginUser = userRepository.findById(id)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        Letter letter = letterRepository.findByLetterId(letterId).get();

        if (!letter.getFromUser().equals(loginUser) && !letter.getToUser().equals(loginUser)) {
            throw new ExceptionResponse(CustomException.NO_AUTH_OF_LETTER_EXCEPTION);
        }

        // letter의 isRead가 false이면 true로 변경
        if (!letter.isRead()) letter.readLetter();

        return letterMapper.toResponseDto(letter);
    }

}
