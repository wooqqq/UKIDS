package com.modernfamily.ukids.domain.letter.model;

import com.modernfamily.ukids.domain.letter.dto.LetterDto;
import com.modernfamily.ukids.domain.letter.entity.Letter;
import com.modernfamily.ukids.domain.letter.repository.LetterRepository;
import com.modernfamily.ukids.domain.user.entity.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class LetterService {

    private LetterRepository letterRepository;

    public LetterService(LetterRepository letterRepository) {
        this.letterRepository = letterRepository;
    }

    public Letter save(LetterDto letterDto) {
        Letter letter = letterDto.toEntity();
        return letterRepository.save(letter);
    }

    // 로그인한 사용자가 toUser(수신인)인 경우
    public List<Letter> findByToUser(User toUserId) {
        return letterRepository.findAllByToUser(toUserId);
    }

    // 로그인한 사용자가 fromUser(발신인)인 경우
    public List<Letter> findByFromUser(User fromUserId) {
        return letterRepository.findAllByFromUser(fromUserId);
    }

    // 편지 상세 조회
    public Optional<Letter> findByLetterId(Long letterId) {
        return letterRepository.findByLetterId(letterId);
    }

    // 편지 삭제 (논리적 삭제)
    public void deleteByLetterId(Long letterId) {
        Optional<Letter> optionalLetter = letterRepository.findByLetterId(letterId);
        if (optionalLetter.isPresent()) {
            Letter letter = optionalLetter.get();
            letter.setIsDelete(true);
            letter.setUpdateTime(LocalDateTime.now());  // updateTime 갱신
            letterRepository.save(letter);
        }
    }
}
