package com.modernfamily.ukids.domain.game.quiz.model.service;

import com.modernfamily.ukids.domain.familyMember.model.repository.FamilyMemberRepository;
import com.modernfamily.ukids.domain.familyMember.model.service.FamilyMemberService;
import com.modernfamily.ukids.domain.game.quiz.dto.QuizRoom;
import com.modernfamily.ukids.domain.user.model.repository.UserRepository;
import com.modernfamily.ukids.domain.user.model.service.UserService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class QuizService {

    // Websocketsession, 방 정보
    private Map<String, QuizRoom> quizRooms;
    private final UserRepository userRepository;
    private final FamilyMemberRepository familyMemberRepository;

    @PostConstruct
    private void init() {
        quizRooms = new HashMap<>();
    }

    // 게임방 생성 -> 있으면 참여, 없으면 생성 + 중복 참여인지 검사 + 유저 참여
    // + webrtc 세션 생성 + connection 반환


    // 유저 참여 + connection 반환


    // 유저 퇴장


    // 게임방 정보 반환


    // 퀴즈 개수 설정

    
    // 퀴즈 생성 가능 개수 반환


    // 준비 클릭 -> 다 준비되면 바로 게임 시작 -> 퀴즈 개수만큼 퀴즈 생성


    // 질문 반환 -> 반환 끝나면 게임 종료
    

    // 정답 확인


    // 게임 종료 -> DB 저장

}
