package com.modernfamily.ukids.domain.game.callGameResult.model.service;

import com.modernfamily.ukids.domain.familyMember.entity.FamilyMember;
import com.modernfamily.ukids.domain.familyMember.model.repository.FamilyMemberRepository;
import com.modernfamily.ukids.domain.game.callGameResult.dto.CallMyNameGameResultSaveDto;
import com.modernfamily.ukids.domain.game.callGameResult.entity.CallMyNameGameResult;
import com.modernfamily.ukids.domain.game.callGameResult.model.repository.CallMyNameGameResultRepository;
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
public class CallMyNameGameResultServiceImpl implements CallMyNameGameResultService {

    private final CallMyNameGameResultRepository gameResultRepository;
    private final FamilyMemberRepository familyMemberRepository;

    public void saveGameResult(List<CallMyNameGameResultSaveDto> gameResultSaveDtoList) {
        List<CallMyNameGameResult> gameResultList = new ArrayList<>();

        for (CallMyNameGameResultSaveDto gameResultSaveDto : gameResultSaveDtoList) {
            FamilyMember familyMember = familyMemberRepository.findByUser_IdAndFamily_FamilyId(
                    gameResultSaveDto.getParticipantId(), gameResultSaveDto.getFamilyId())
                    .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_FAMILYMEMBER_EXCEPTION));
            gameResultList.add(CallMyNameGameResult.createGameResult(gameResultSaveDto, familyMember.getUser(), familyMember.getFamily()));
        }

        gameResultRepository.saveAll(gameResultList);
    }

}
