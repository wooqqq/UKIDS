package com.modernfamily.ukids.domain.game.quizResult.model.service;

import com.modernfamily.ukids.domain.familyMember.entity.FamilyMember;
import com.modernfamily.ukids.domain.familyMember.model.repository.FamilyMemberRepository;
import com.modernfamily.ukids.domain.game.quizResult.dto.GameResultSaveDto;
import com.modernfamily.ukids.domain.game.quizResult.entity.GameResult;
import com.modernfamily.ukids.domain.game.quizResult.model.repository.GameResultRepoitory;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GameResultServiceImpl implements GameResultService {

    private final GameResultRepoitory gameResultRepoitory;
    private final FamilyMemberRepository familyMemberRepository;

    public void saveGameResult(List<GameResultSaveDto> gameResultSaveDtoList) {
        List<GameResult> gameResultList = new ArrayList<>();

        for (GameResultSaveDto gameResultSaveDto : gameResultSaveDtoList) {
            FamilyMember familyMember = familyMemberRepository.findByUser_IdAndFamily_FamilyId
                    (gameResultSaveDto.getParticipantId(), gameResultSaveDto.getFamilyId())
                    .orElseThrow(()->new ExceptionResponse(CustomException.NOT_FOUND_FAMILYMEMBER_EXCEPTION));
            gameResultList.add(GameResult.createGameResult(gameResultSaveDto, familyMember.getUser(), familyMember.getFamily()));
        }

        gameResultRepoitory.saveAll(gameResultList);
    }

}
