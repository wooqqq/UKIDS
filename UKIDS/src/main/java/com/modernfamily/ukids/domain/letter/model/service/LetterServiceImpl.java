package com.modernfamily.ukids.domain.letter.model.service;

import com.modernfamily.ukids.domain.letter.dto.request.LetterCreateRequestDto;
import com.modernfamily.ukids.domain.letter.entity.Letter;
import com.modernfamily.ukids.domain.letter.mapper.LetterMapper;
import com.modernfamily.ukids.domain.letter.model.repository.LetterRepository;
import com.modernfamily.ukids.domain.tree.entity.Tree;
import com.modernfamily.ukids.domain.tree.model.repository.TreeRepository;
import com.modernfamily.ukids.domain.user.dto.CustomUserDetails;
import com.modernfamily.ukids.domain.user.entity.User;
import com.modernfamily.ukids.domain.user.model.repository.UserRepository;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class LetterServiceImpl implements LetterService {

    private final LetterRepository letterRepository;
    private final TreeRepository treeRepository;
    private final UserRepository userRepository;
    private final LetterMapper letterMapper;

    @Override
    public Letter createLetter(LetterCreateRequestDto letterDto) {
        String id = CustomUserDetails.contextGetUserId();
        User fromUser = userRepository.findById(id)
                .orElseThrow(()-> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        User toUser = userRepository.findByUserId(letterDto.getToUserId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        Tree tree = treeRepository.findByFamily_FamilyId(letterDto.getFamilyId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_TREE_EXCEPTION));

        Letter createdLetter = Letter.createLetter(letterDto.getContent(), tree, fromUser, toUser);

        return letterRepository.save(createdLetter);
    }

    // 로그인한 사용자가 toUser(수신인)인 경우
    @Override
    public List<Letter> findByToUser(User toUserId) {
        return letterRepository.findAllByToUser(toUserId);
    }

    // 로그인한 사용자가 fromUser(발신인)인 경우
    @Override
    public List<Letter> findByFromUser(User fromUserId) {
        return letterRepository.findAllByFromUser(fromUserId);
    }

    // 편지 상세 조회
    @Override
    public Optional<Letter> findByLetterId(Long letterId) {
        return letterRepository.findByLetterId(letterId);
    }

    // 편지 삭제 (논리적 삭제)
    @Override
    public void deleteByLetterId(Long letterId) {
        Optional<Letter> optionalLetter = letterRepository.findByLetterId(letterId);
        if (optionalLetter.isPresent()) {
            Letter letter = optionalLetter.get();
            letter.setIsDelete(true);
            letterRepository.save(letter);
        }
    }
}
