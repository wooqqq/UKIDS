package com.modernfamily.ukids.domain.game.quizQuestion.controller;

import com.modernfamily.ukids.domain.game.quizQuestion.dto.request.QuizQuestionCreateRequestDto;
import com.modernfamily.ukids.domain.game.quizQuestion.message.SuccessMessage;
import com.modernfamily.ukids.domain.game.quizQuestion.model.service.QuizQuestionService;
import com.modernfamily.ukids.global.util.HttpMethodCode;
import com.modernfamily.ukids.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/game/quiz/question")
@RequiredArgsConstructor
public class QuizQuestionController {

    private final QuizQuestionService quizQuestionService;
    private final HttpResponseUtil responseUtil;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createQuizQuestion(@RequestBody QuizQuestionCreateRequestDto requestDto) {
        quizQuestionService.createQuizQuestion(requestDto);

        return responseUtil.createResponse(HttpMethodCode.POST, SuccessMessage.SUCCESS_CREATE_QUIZ_QUESTION.getMessage());
    }
}
