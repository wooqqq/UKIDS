package com.modernfamily.ukids.domain.game.quiz.dto;

import com.modernfamily.ukids.domain.game.quizQuestion.dto.response.QuizQuestionRandomResponseDto;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Slf4j
public class QuizRoom {
    private String sessionId;
    private Long quizCount;
    private boolean isStart;
    private boolean isSave;
    private Long numberOfParticipants;
    private Long maxQuestionCounts;
    private int currentQuestionIndex;
    private HashMap<String, Participate> participantList;
    private List<QuizQuestionRandomResponseDto> randomQuizQuestionList;

    @Builder
    private QuizRoom(String sessionId ,Long quizCount, boolean isStart, boolean isSave,
                     Long numberOfParticipants, Long maxQuestionCounts, int currentQuestionIndex,
                     HashMap<String, Participate> participantList, List<QuizQuestionRandomResponseDto> randomQuizQuestionList) {
        this.sessionId = sessionId;
        this.quizCount = quizCount;
        this.isStart = isStart;
        this.isSave = isSave;
        this.numberOfParticipants = numberOfParticipants;
        this.maxQuestionCounts = maxQuestionCounts;
        this.currentQuestionIndex = currentQuestionIndex;
        this.participantList = participantList;
        this.randomQuizQuestionList = randomQuizQuestionList;
    }

    public static QuizRoom createQuizRoom(String sessionId){
        return QuizRoom.builder()
                .sessionId(sessionId)
                .quizCount(0L)
                .isStart(false)
                .isSave(false)
                .numberOfParticipants(0L)
                .maxQuestionCounts(Long.MAX_VALUE)
                .currentQuestionIndex(-1)
                .participantList(new HashMap<String, Participate>())
                .randomQuizQuestionList(new ArrayList<>())
                .build();

    }

    public void saveGame(){
        this.isSave = true;
    }

    public void updateQuizCount(long quizCount){
        this.quizCount = quizCount;
    }

    public void updateMaxQuestionCounts(){
        this.maxQuestionCounts = Long.MAX_VALUE;
        for(Map.Entry<String, Participate> entry : participantList.entrySet()){
            Participate participate = entry.getValue();
            this.maxQuestionCounts = Math.min(maxQuestionCounts, participate.getMaxQuestion());
        }
    }

    public void startGame(){
        this.isStart = true;
        this.isSave = false;
    }

    public void endGame(){
        this.isStart = false;
        this.currentQuestionIndex = -1;
        this.randomQuizQuestionList.clear();
    }

    public void enterParticipate(String userId, Participate participant){
        participantList.put(userId, participant);
        log.info("Enter user : {}", participant.getUserName());
        this.maxQuestionCounts = Math.min(maxQuestionCounts, participant.getMaxQuestion());
        log.info("User's Max question count : {}", participant.getMaxQuestion());
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