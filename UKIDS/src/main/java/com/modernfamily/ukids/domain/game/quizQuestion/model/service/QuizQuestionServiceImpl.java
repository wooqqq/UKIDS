package com.modernfamily.ukids.domain.game.quizQuestion.model.service;

import com.modernfamily.ukids.domain.album.dto.response.FamilyAlbumListResponseDto;
import com.modernfamily.ukids.domain.album.dto.response.FamilyAlbumPagenationResponseDto;
import com.modernfamily.ukids.domain.album.entity.Album;
import com.modernfamily.ukids.domain.family.dto.FamilyResponseDto;
import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.game.quizQuestion.dto.request.QuizQuestionCreateRequestDto;
import com.modernfamily.ukids.domain.game.quizQuestion.dto.request.QuizQuestionUpdateRequestDto;
import com.modernfamily.ukids.domain.game.quizQuestion.dto.response.QuizQuestionListPagenationResponseDto;
import com.modernfamily.ukids.domain.game.quizQuestion.dto.response.QuizQuestionListResponseDto;
import com.modernfamily.ukids.domain.game.quizQuestion.dto.response.QuizQuestionResponseDto;
import com.modernfamily.ukids.domain.game.quizQuestion.entity.QuizQuestion;
import com.modernfamily.ukids.domain.game.quizQuestion.model.repository.QuizQuestionRepository;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class QuizQuestionServiceImpl implements QuizQuestionService {

    private final UserRepository userRepository;
    private final QuizQuestionRepository quizQuestionRepository;
    private final UserMapper userMapper;

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
        String id = CustomUserDetails.contextGetUserId();
        User writer = userRepository.findById(id).orElseThrow(()-> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        QuizQuestion existQuizQuestion = quizQuestionRepository.findByQuizQuestionId(requestDto.getQuizQuestionId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_QUIZ_EXCEPTION));

        if(writer.getUserId() != existQuizQuestion.getWriter().getUserId())
            throw new ExceptionResponse(CustomException.ACCESS_DENIEND_EXCEPTION);

        QuizQuestion quizQuestion = QuizQuestion.createQuizQuestion(requestDto.getQuestion(), requestDto.getAnswer(),
                requestDto.getQuizType(), writer);

        quizQuestion.updateQuizQuestion(requestDto.getQuizQuestionId());

        quizQuestionRepository.save(quizQuestion);
    }

    @Transactional
    public void deleteQuizQuestion(Long quizQuestionId) {
        String id = CustomUserDetails.contextGetUserId();
        User writer = userRepository.findById(id).orElseThrow(()-> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        QuizQuestion quizQuestion = quizQuestionRepository.findByQuizQuestionId(quizQuestionId)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_QUIZ_EXCEPTION));

        quizQuestion.deleteQuizQuestion();

        quizQuestionRepository.save(quizQuestion);
    }

    public QuizQuestionResponseDto getQuizQuestion(Long quizQuestionId) {
        String id = CustomUserDetails.contextGetUserId();
        User writer = userRepository.findById(id).orElseThrow(()-> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        QuizQuestion quizQuestion = quizQuestionRepository.findByQuizQuestionId(quizQuestionId)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_QUIZ_EXCEPTION));

        return QuizQuestionResponseDto.createResponseDto(quizQuestion, userMapper.toUserDto(writer));
    }

    public QuizQuestionListPagenationResponseDto getQuizQuestionListByUser(int size, int page) {
        String id = CustomUserDetails.contextGetUserId();
        User writer = userRepository.findById(id).orElseThrow(()-> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        Pageable pageable = PageRequest.of(--page, size);
        Page<QuizQuestion> quizQuestionsPage = quizQuestionRepository.findByWriter_UserId(writer.getUserId(), pageable);

        List<QuizQuestion> quizQuestionList = quizQuestionsPage.getContent();
        List<QuizQuestionListResponseDto> responseDtoList = new ArrayList<>();

        for (QuizQuestion quizQuestion : quizQuestionList) {
            responseDtoList.add(QuizQuestionListResponseDto.createResponseDto(quizQuestion));
        }

        QuizQuestionListPagenationResponseDto pagenationResponseDto = QuizQuestionListPagenationResponseDto
                .createResponseDto(quizQuestionsPage.getNumberOfElements(), quizQuestionsPage.getNumber()+1,
                        quizQuestionsPage.getTotalPages(), quizQuestionsPage.getTotalElements(), responseDtoList, userMapper.toUserDto(writer));

        return pagenationResponseDto;
    }

    public List<QuizQuestionResponseDto> chooseRandomQuizQuestion(Long userId ,long count) {
        User writer = userRepository.findById(userId)
                .orElseThrow(()-> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        long existCount = quizQuestionRepository.countByWriter_UserId(writer.getUserId());
        if(existCount < count)
            throw new ExceptionResponse(CustomException.NOT_ENOUGH_QUIZ_QUESTION_EXCEPTION);

        List<QuizQuestion> quizQuestions = quizQuestionRepository.findRandomQuizQuestionsByUSer(count, writer.getUserId());
        List<QuizQuestionResponseDto> responseDtoList = new ArrayList<>();

        for (QuizQuestion quizQuestion : quizQuestions) {
            responseDtoList.add(QuizQuestionResponseDto.createResponseDto(quizQuestion, userMapper.toUserDto(writer)));
        }

        return responseDtoList;
    }


}
