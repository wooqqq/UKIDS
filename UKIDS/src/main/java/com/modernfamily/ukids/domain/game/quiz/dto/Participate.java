package com.modernfamily.ukids.domain.game.quiz.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Participate {
    private long maxQuestion;
    private long hit;
    private boolean isReady;

    private Participate(long maxQuestion, long hit, boolean isReady) {
        this.maxQuestion = maxQuestion;
        this.hit = hit;
        this.isReady = isReady;
    }

    public static Participate createParticipate(long maxQuestion) {
        return new Participate(maxQuestion, 0, false);
    }

    public void hittingAnswer(){
        this.hit++;
    }

    public void clickReady(){
        this.isReady = !this.isReady;
    }
}
