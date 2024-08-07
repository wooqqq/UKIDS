package com.modernfamily.ukids.domain.game.quizQuestion.model.service;

import com.modernfamily.ukids.domain.game.quizQuestion.dto.request.QuizQuestionCreateRequestDto;
import com.modernfamily.ukids.domain.game.quizQuestion.dto.request.QuizQuestionUpdateRequestDto;
import com.modernfamily.ukids.domain.game.quizQuestion.dto.response.QuizQuestionResponseDto;

public interface QuizQuestionService {
    void createQuizQuestion(QuizQuestionCreateRequestDto requestDto);
    void updateQuizQuestion(QuizQuestionUpdateRequestDto requestDto);
    void deleteQuizQuestion(Long quizQuestionId);
    QuizQuestionResponseDto getQuizQuestion(Long quizQuestionId);
}
