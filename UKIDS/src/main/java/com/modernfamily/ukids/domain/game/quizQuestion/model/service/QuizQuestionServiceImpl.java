package com.modernfamily.ukids.domain.game.quizQuestion.model.service;

import com.modernfamily.ukids.domain.game.quizQuestion.dto.request.QuizQuestionCreateRequestDto;
import com.modernfamily.ukids.domain.game.quizQuestion.dto.request.QuizQuestionUpdateRequestDto;
import com.modernfamily.ukids.domain.game.quizQuestion.entity.QuizQuestion;
import com.modernfamily.ukids.domain.game.quizQuestion.model.repository.QuizQuestionRepository;
import com.modernfamily.ukids.domain.user.dto.CustomUserDetails;
import com.modernfamily.ukids.domain.user.entity.User;
import com.modernfamily.ukids.domain.user.model.repository.UserRepository;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class QuizQuestionServiceImpl implements QuizQuestionService {

    private final UserRepository userRepository;
    private final QuizQuestionRepository quizQuestionRepository;

    @Transactional
    public void createQuizQuestion(QuizQuestionCreateRequestDto requestDto) {
        String id = CustomUserDetails.contextGetUserId();
        User writer = userRepository.findById(id).orElseThrow(()-> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        QuizQuestion quizQuestion = QuizQuestion.createQuizQuestion(requestDto.getQuestion(), requestDto.getAnswer(),
                requestDto.getQuizType(), writer);

        quizQuestionRepository.save(quizQuestion);
    }

    @Transactional
    public void updateQuizQuestion(QuizQuestionUpdateRequestDto requestDto) {
//        String id = CustomUserDetails.contextGetUserId();
//        User writer = userRepository.findById(id).orElseThrow(()-> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));
//
//        QuizQuestion quizQuestion = QuizQuestion.createQuizQuestion(requestDto.getQuestion(), requestDto.getAnswer(),
//                requestDto.getQuizType(), writer);
//
//        quizQuestionRepository.save(quizQuestion);
    }
}
