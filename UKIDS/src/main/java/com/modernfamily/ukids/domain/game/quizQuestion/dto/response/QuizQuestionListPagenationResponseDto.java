package com.modernfamily.ukids.domain.game.quizQuestion.dto.response;

import com.modernfamily.ukids.domain.game.quizQuestion.entity.QuizQuestion;
import com.modernfamily.ukids.domain.game.quizQuestion.entity.QuizType;
import com.modernfamily.ukids.domain.user.dto.UserDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class QuizQuestionListPagenationResponseDto {

    int size;

    int currentPage;

    int totalPages;

    private List<QuizQuestionListResponseDto> quizQuestions;

    private UserDto writer;

    @Builder
    private QuizQuestionListPagenationResponseDto(int size, int currentPage, int totalPages,
                                                  List<QuizQuestionListResponseDto> quizQuestions, UserDto writer) {
        this.size = size;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.quizQuestions = quizQuestions;
        this.writer = writer;
    }

    public static QuizQuestionListPagenationResponseDto createResponseDto(int size, int currentPage, int totalPages,
                                                                          List<QuizQuestionListResponseDto> quizQuestions, UserDto writer){
        return QuizQuestionListPagenationResponseDto.builder()
                .size(size)
                .currentPage(currentPage)
                .totalPages(totalPages)
                .quizQuestions(quizQuestions)
                .writer(writer)
                .build();
    }
}
