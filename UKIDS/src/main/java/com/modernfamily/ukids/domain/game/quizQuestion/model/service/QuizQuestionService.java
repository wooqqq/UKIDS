package com.modernfamily.ukids.domain.game.quizQuestion.model.service;

import com.modernfamily.ukids.domain.game.quizQuestion.dto.request.QuizQuestionCreateRequestDto;
import com.modernfamily.ukids.domain.game.quizQuestion.dto.request.QuizQuestionUpdateRequestDto;

public interface QuizQuestionService {
    void createQuizQuestion(QuizQuestionCreateRequestDto requestDto);
    void updateQuizQuestion(QuizQuestionUpdateRequestDto requestDto);
//    void createQuizQuestion(QuizQuestionCreateRequestDto requestDto);
//    void createQuizQuestion(QuizQuestionCreateRequestDto requestDto);
}
