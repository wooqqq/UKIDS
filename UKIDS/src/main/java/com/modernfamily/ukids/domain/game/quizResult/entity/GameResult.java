package com.modernfamily.ukids.domain.game.quizResult.entity;

import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.game.quizResult.dto.GameResultSaveDto;
import com.modernfamily.ukids.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GameResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_result_id")
    private Long gameResultId;

    @Column(name = "game_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private GameType gameType;

    @Column(name = "correct_counts")
    private long correctCounts;

    @Column(name = "total_counts")
    private long totalCounts;

    @Column(name = "rank", nullable = false)
    private long rank;

    @Column(name = "date", columnDefinition = "DATE", nullable = false)
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User participant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "family_id", nullable = false)
    private Family family;

    @Builder
    private GameResult(GameType gameType, long correctCounts, long totalCounts, long rank,
                       LocalDate date, User participant, Family family) {
        this.gameType = gameType;
        this.correctCounts = correctCounts;
        this.totalCounts = totalCounts;
        this.rank = rank;
        this.date = date;
        this.participant = participant;
        this.family = family;
    }

    public static GameResult createGameResult(GameResultSaveDto gameResultSaveDto, User participant, Family family) {
        return GameResult.builder()
                .gameType(gameResultSaveDto.getGameType())
                .correctCounts(gameResultSaveDto.getCorrectCounts())
                .totalCounts(gameResultSaveDto.getTotalCounts())
                .rank(gameResultSaveDto.getRank())
                .date(gameResultSaveDto.getDate())
                .participant(participant)
                .family(family)
                .build();
    }

}
