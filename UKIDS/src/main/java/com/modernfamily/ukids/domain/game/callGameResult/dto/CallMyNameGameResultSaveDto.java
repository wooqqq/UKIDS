package com.modernfamily.ukids.domain.game.callGameResult.dto;

import com.modernfamily.ukids.domain.game.gameResult.entity.GameType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class CallMyNameGameResultSaveDto {

    private GameType gameType;

    private long correctRound;

    private String keyword;

    private long rank;

    private LocalDate date;

    private String participantId;

    private Long familyId;

    @Builder
    private CallMyNameGameResultSaveDto(GameType gameType, long correctRound, String keyword, long rank,
                              LocalDate date, String participantId, Long familyId) {
        this.gameType = gameType;
        this.correctRound = correctRound;
        this.keyword = keyword;
        this.rank = rank;
        this.date = date;
        this.participantId = participantId;
        this.familyId = familyId;
    }

    public static CallMyNameGameResultSaveDto createGameResultDto(GameType gameType, long correctRound, String keyword,
                                                        long rank, String participantId, Long familyId) {
        return CallMyNameGameResultSaveDto.builder()
                .gameType(gameType)
                .correctRound(correctRound)
                .keyword(keyword)
                .rank(rank)
                .date(LocalDate.now())
                .participantId(participantId)
                .familyId(familyId)
                .build();
    }
}
