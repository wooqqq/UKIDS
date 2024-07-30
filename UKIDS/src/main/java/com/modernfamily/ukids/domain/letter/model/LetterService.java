package com.modernfamily.ukids.domain.letter.model;

import com.modernfamily.ukids.domain.letter.dto.LetterDto;
import com.modernfamily.ukids.domain.letter.entity.Letter;
import com.modernfamily.ukids.domain.letter.repository.LetterRepository;
import org.springframework.stereotype.Service;

@Service
public class LetterService {

    private LetterRepository letterRepository;

    public LetterService(LetterRepository letterRepository) {
        this.letterRepository = letterRepository;
    }

    public Letter save(LetterDto letterDto) {
        Letter letter = letterDto.toEntity();
        System.out.println("왔음");
        return letterRepository.save(letter);
    }
}
