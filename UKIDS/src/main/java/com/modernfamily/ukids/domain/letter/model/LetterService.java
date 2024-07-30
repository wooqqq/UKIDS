package com.modernfamily.ukids.domain.letter.model;

import com.modernfamily.ukids.domain.letter.repository.LetterRepository;
import org.springframework.stereotype.Service;

@Service
public class LetterService {

    private LetterRepository letterRepository;

    public LetterService(LetterRepository letterRepository) {
        this.letterRepository = letterRepository;
    }
}
