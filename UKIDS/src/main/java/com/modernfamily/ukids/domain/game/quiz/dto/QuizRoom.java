package com.modernfamily.ukids.domain.game.quiz.dto;

import com.modernfamily.ukids.domain.game.quizResult.entity.GameType;
import com.modernfamily.ukids.domain.game.quizQuestion.dto.response.QuizQuestionRandomResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.util.HashMap;
import java.util.List;

@Getter
public class QuizRoom {
    private GameType gameType;
    private String sessionId;
    private Long quizCount;
    private boolean isStart;
    private Long numberOfParticipants;
    private Long maxQuestionCounts;
    private int currentQuestionIndex;
    private HashMap<String, Participate> participantList;
    private List<QuizQuestionRandomResponseDto> randomQuizQuestionList;

    @Builder
    private QuizRoom(GameType gameType, String sessionId ,Long quizCount, boolean isStart,
                     Long numberOfParticipants, Long maxQuestionCounts, int currentQuestionIndex,
                     HashMap<String, Participate> participantList, List<QuizQuestionRandomResponseDto> randomQuizQuestionList) {
        this.gameType = gameType;
        this.sessionId = sessionId;
        this.quizCount = quizCount;
        this.isStart = isStart;
        this.numberOfParticipants = numberOfParticipants;
        this.maxQuestionCounts = maxQuestionCounts;
        this.currentQuestionIndex = currentQuestionIndex;
        this.participantList = participantList;
        this.randomQuizQuestionList = randomQuizQuestionList;
    }

    public static QuizRoom createQuizRoom(GameType gameType, String sessionId){
        return QuizRoom.builder()
                .gameType(gameType)
                .sessionId(sessionId)
                .quizCount(0L)
                .isStart(false)
                .numberOfParticipants(0L)
                .maxQuestionCounts(0L)
                .currentQuestionIndex(-1)
                .participantList(new HashMap<String, Participate>())
                .randomQuizQuestionList(null)
                .build();

    }

    public void updateQuizCount(long quizCount){
        this.quizCount = quizCount;
    }

    public void startGame(){
        this.isStart = true;
    }

    public void enterParticipate(String userId, Participate participant){
        participantList.put(userId, participant);
        maxQuestionCounts = Math.min(maxQuestionCounts, participant.getMaxQuestion());
        ++this.numberOfParticipants;
    }

    public void exitParticipate(String userId){
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

    public boolean increaseCurrentQuestionIndex(){
        if(randomQuizQuestionList.size()-1 == this.currentQuestionIndex)
            return false;

        this.currentQuestionIndex++;
        return true;
    }

}
