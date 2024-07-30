package com.modernfamily.ukids.domain.letter.controller;

import com.modernfamily.ukids.domain.letter.model.LetterService;
import org.springframework.stereotype.Controller;

@Controller
public class LetterController {

    private LetterService letterService;

    public LetterController (LetterService letterService) {
        this.letterService = letterService;
    }
}
