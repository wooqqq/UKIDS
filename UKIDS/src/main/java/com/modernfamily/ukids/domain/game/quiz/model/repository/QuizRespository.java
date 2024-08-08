package com.modernfamily.ukids.domain.game.quiz.model.repository;

import com.modernfamily.ukids.domain.game.gameResult.dto.GameResultSaveDto;
import com.modernfamily.ukids.domain.game.quiz.dto.Participate;
import com.modernfamily.ukids.domain.game.quiz.dto.QuizRoom;
import jakarta.annotation.PostConstruct;

import java.util.*;

public class QuizRespository {

    // 퀴즈 가져오기 및 출제

    // 퀴즈 정답 확인
    
    // 게임 종료 및 퀴즈 결과 저장
    public List<GameResultSaveDto> endGame(QuizRoom quizRoom){

        List<Map.Entry<Long, Participate>> entryList = new ArrayList<>(quizRoom.getParticipantList().entrySet());
        entryList.sort(Comparator.comparing((Map.Entry<Long, Participate> entry) -> entry.getValue().getHit()).reversed());

        long totalCounts = quizRoom.getParticipantList().size() * quizRoom.getQuizCount();
        long prevCounts = 0;
        long rank = 1L;
        List<GameResultSaveDto> gameResultSaveDtoList = new ArrayList<>();
        for(Map.Entry<Long, Participate> entry : entryList){
            if(prevCounts == entry.getValue().getHit())
                rank--;
            gameResultSaveDtoList.add(GameResultSaveDto.createGameResultDto(quizRoom.getGameType(), entry.getValue().getHit(),
                    totalCounts, rank, entry.getKey(), quizRoom.getFamilyId()));
            prevCounts = entry.getValue().getHit();
            rank++;
        }

        return gameResultSaveDtoList;
    }

}
