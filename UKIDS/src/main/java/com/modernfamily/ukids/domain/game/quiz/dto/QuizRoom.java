package com.modernfamily.ukids.domain.game.quiz.dto;

import com.modernfamily.ukids.domain.game.gameResult.entity.GameType;
import com.modernfamily.ukids.domain.game.quizQuestion.dto.response.QuizQuestionRandomResponseDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;

@Getter
public class QuizRoom {
    private Long familyId;
    private GameType gameType;
    private String SessionId;
    private Long quizCount;
    private boolean isStart;
    private Long numberOfParticipants;
    private Long maxQuestionCounts;
    private Long currentQuestionIndex;
    private HashMap<Long, Participate> participantList;
    private List<QuizQuestionRandomResponseDto> randomQuizQuestionList;

    @Builder
    private QuizRoom(Long familyId, GameType gameType, String sessionId ,Long quizCount, boolean isStart,
                     Long numberOfParticipants, Long maxQuestionCounts, Long currentQuestionIndex,
                     HashMap<Long, Participate> participantList, List<QuizQuestionRandomResponseDto> randomQuizQuestionList) {
        this.familyId = familyId;
        this.gameType = gameType;
        this.SessionId = sessionId;
        this.quizCount = quizCount;
        this.isStart = isStart;
        this.numberOfParticipants = numberOfParticipants;
        this.maxQuestionCounts = maxQuestionCounts;
        this.currentQuestionIndex = currentQuestionIndex;
        this.participantList = participantList;
        this.randomQuizQuestionList = randomQuizQuestionList;
    }

    public static QuizRoom createQuizRoom(Long familyId, GameType gameType, String sessionId){
        return QuizRoom.builder()
                .familyId(familyId)
                .gameType(gameType)
                .sessionId(sessionId)
                .quizCount(0L)
                .isStart(false)
                .numberOfParticipants(0L)
                .maxQuestionCounts(0L)
                .currentQuestionIndex(0L)
                .participantList(new HashMap<Long, Participate>())
                .randomQuizQuestionList(null)
                .build();

    }

    public void updateQuizCount(long quizCount){
        this.quizCount = quizCount;
    }

    public void startGame(){
        this.isStart = true;
    }

    public void enterParticipate(Long userId, Participate participant){
        participantList.put(userId, participant);
        maxQuestionCounts = Math.min(maxQuestionCounts, participant.getMaxQuestion());
        ++this.numberOfParticipants;
    }

    public void exitParticipate(Long userId){
        long exitQuestionCount = participantList.get(userId).getMaxQuestion();
        participantList.remove(userId);

        if(maxQuestionCounts == exitQuestionCount){
              for(Participate participant : participantList.values()){
                  maxQuestionCounts = Math.min(maxQuestionCounts, participant.getMaxQuestion());
              }
        }
        --this.numberOfParticipants;
    }

    public void generateRandomQuizQuestion(List<QuizQuestionRandomResponseDto> randomQuizQuestionList){
        this.randomQuizQuestionList.addAll(randomQuizQuestionList);
    }

    public long increaseCurrentQuestionIndex(){
        if(randomQuizQuestionList.size() == ++this.currentQuestionIndex)
            this.currentQuestionIndex = -1L;
        return this.currentQuestionIndex;
    }

}
