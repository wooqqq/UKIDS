package com.modernfamily.ukids.domain.game.gameResult.dto;

import com.modernfamily.ukids.domain.game.gameResult.entity.GameResult;
import com.modernfamily.ukids.domain.game.gameResult.entity.GameType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class GameResultSaveDto {

    private GameType gameType;

    private long correctCounts;

    private long totalCounts;

    private long rank;

    private LocalDate date;

    private Long participantId;

    private Long familyId;

    @Builder
    private GameResultSaveDto(GameType gameType, long correctCounts, long totalCounts, long rank,
                             LocalDate date, Long participantId, Long familyId) {
        this.gameType = gameType;
        this.correctCounts = correctCounts;
        this.totalCounts = totalCounts;
        this.rank = rank;
        this.date = date;
        this.participantId = participantId;
        this.familyId = familyId;
    }

    public static GameResultSaveDto createGameResultDto(GameType gameType, long correctCounts, long totalCounts,
                                                        long rank, Long participantId, Long familyId) {
        return GameResultSaveDto.builder()
                .gameType(gameType)
                .correctCounts(correctCounts)
                .totalCounts(totalCounts)
                .rank(rank)
                .date(LocalDate.now())
                .participantId(participantId)
                .familyId(familyId)
                .build();
    }
}
