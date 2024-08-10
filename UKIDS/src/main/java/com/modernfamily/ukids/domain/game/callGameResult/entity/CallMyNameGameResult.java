package com.modernfamily.ukids.domain.game.callGameResult.entity;

import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.game.callGameResult.dto.CallMyNameGameResultSaveDto;
import com.modernfamily.ukids.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CallMyNameGameResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_result_id")
    private Long gameResultId;

    @Column(name = "correct_round")
    private Long correctRound;

    @Column(name = "keyword")
    private String keyword;

    @Column(name = "rank", nullable = false)
    private Long rank;

    @Column(name = "date", columnDefinition = "DATE", nullable = false)
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User participant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "family_id", nullable = false)
    private Family family;

    @Builder
    private CallMyNameGameResult(Long correctRound, String keyword, Long rank,
                       LocalDate date, User participant, Family family) {
        this.correctRound = correctRound;
        this.keyword = keyword;
        this.rank = rank;
        this.date = date;
        this.participant = participant;
        this.family = family;
    }

    public static CallMyNameGameResult createGameResult(CallMyNameGameResultSaveDto callMyNameGameResultSaveDto, User participant, Family family) {
        return CallMyNameGameResult.builder()
                .correctRound(callMyNameGameResultSaveDto.getCorrectRound())
                .keyword(callMyNameGameResultSaveDto.getKeyword())
                .rank(callMyNameGameResultSaveDto.getRank())
                .date(callMyNameGameResultSaveDto.getDate())
                .participant(participant)
                .family(family)
                .build();
    }

}