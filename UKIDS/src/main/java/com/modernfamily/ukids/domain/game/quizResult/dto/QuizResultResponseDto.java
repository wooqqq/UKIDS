package com.modernfamily.ukids.domain.game.quizResult.dto;

import com.modernfamily.ukids.domain.family.entity.Family;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class QuizResultResponseDto {

    private long correctCounts;

    private long totalCounts;

    private long rank;

    private LocalDate date;

    private Long familyId;

    private String familyName;

    private String familyRepresentative;

    @Builder
    private QuizResultResponseDto(long correctCounts, long totalCounts, long rank,
                                  LocalDate date,Long familyId, String familyName, String familyRepresentative) {
        this.correctCounts = correctCounts;
        this.totalCounts = totalCounts;
        this.rank = rank;
        this.date = date;
        this.familyId = familyId;
        this.familyName = familyName;
        this.familyRepresentative = familyRepresentative;
    }

    public static QuizResultResponseDto createResponseDto(long correctCounts, long totalCounts,
                                                            long rank, Family family) {
        return QuizResultResponseDto.builder()
                .correctCounts(correctCounts)
                .totalCounts(totalCounts)
                .rank(rank)
                .date(LocalDate.now())
                .familyId(family.getFamilyId())
                .familyName(family.getName())
                .familyRepresentative(family.getUser().getName())
                .build();
    }
}
