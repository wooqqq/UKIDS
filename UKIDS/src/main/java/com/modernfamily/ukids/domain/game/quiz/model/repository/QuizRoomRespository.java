package com.modernfamily.ukids.domain.game.quiz.model.repository;

import com.modernfamily.ukids.domain.familyMember.entity.FamilyMember;
import com.modernfamily.ukids.domain.familyMember.model.repository.FamilyMemberRepository;
import com.modernfamily.ukids.domain.game.quiz.dto.Participate;
import com.modernfamily.ukids.domain.game.quiz.dto.QuizRoom;
import com.modernfamily.ukids.domain.game.quizQuestion.model.service.QuizQuestionService;
import com.modernfamily.ukids.domain.user.model.repository.UserRepository;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class QuizRoomRespository {

    private final QuizQuestionService quizQuestionService;
    private final FamilyMemberRepository familyMemberRepository;

    // 게임방 만들기
    public QuizRoom createGameRoom(String sessionId){
        return QuizRoom.createQuizRoom(sessionId);
    }

    // 유저 참여
    public void enterGame(String userId, long familyId, QuizRoom quizRoom){
        long maxCounts = quizQuestionService.getCountQuizQuestionByUser(userId);
        Optional<FamilyMember> familyMember = familyMemberRepository.findByUser_IdAndFamily_FamilyId(userId, familyId);

        if(familyMember.isEmpty() || familyMember == null)
            throw new IllegalArgumentException("NOT FOUND FAMILYMEMBER EXCEPTION");
        quizRoom.enterParticipate(userId, Participate.createParticipate(familyMember.get().getUser().getName(),
                familyMember.get().getRole(), maxCounts));
    }

    // 게임 중복 참여 여부 판별
    public boolean isExistUser(String userId, QuizRoom quizRoom){
        if(quizRoom.getParticipantList().containsKey(userId))
            return true;

        return false;
    }

    // 유저 퇴장
    public void exitGame(String userId, QuizRoom quizRoom){
        quizRoom.exitParticipate(userId);
    }

    // 퀴즈 개수 설정
    public void saveQuizCount(long counts, QuizRoom quizRoom){
        quizRoom.updateQuizCount(counts);
    }

    // 참가자 준비 상태 확인
    public boolean checkReady(QuizRoom quizRoom){
        for(Participate participate : quizRoom.getParticipantList().values()){
            if(!participate.isReady()) return false;
        }
        return true;
    }

    // 참가자 준비 버튼 클릭
    public void clickReady(String userId, QuizRoom quizRoom){
        quizRoom.getParticipantList().get(userId).clickReady();
    }

    // 게임 시작
    public void startGame(QuizRoom quizRoom){
        quizRoom.startGame();
    }

    // 게임 중인지 확인
    public boolean isPlaying(QuizRoom quizRoom){
        return quizRoom.isStart();
    }

    // 퀴즈 생성
    public void generateQuiz(QuizRoom quizRoom){
        long quizCounts = quizRoom.getQuizCount();
        for(Map.Entry<String, Participate> entrySet : quizRoom.getParticipantList().entrySet()){
            quizRoom.generateRandomQuizQuestion(
                    quizQuestionService.chooseRandomQuizQuestion(entrySet.getKey(), quizCounts)
            );
        }
    }
}
