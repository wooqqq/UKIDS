package com.modernfamily.ukids.domain.game.quizResult.model.service;

import com.modernfamily.ukids.domain.album.entity.Album;
import com.modernfamily.ukids.domain.caption.entity.Caption;
import com.modernfamily.ukids.domain.family.dto.FamilyResponseDto;
import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.familyMember.entity.FamilyMember;
import com.modernfamily.ukids.domain.familyMember.model.repository.FamilyMemberRepository;
import com.modernfamily.ukids.domain.game.quizResult.dto.QuizResultSaveDto;
import com.modernfamily.ukids.domain.game.quizResult.entity.GameResult;
import com.modernfamily.ukids.domain.game.quizResult.model.repository.QuizResultRepoitory;
import com.modernfamily.ukids.domain.photo.dto.response.PhotoListPagenationResponseDto;
import com.modernfamily.ukids.domain.photo.dto.response.PhotoListResponseDto;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class QuizResultServiceImpl implements QuizResultService {

    private final QuizResultRepoitory gameResultRepoitory;
    private final FamilyMemberRepository familyMemberRepository;

    public void saveGameResult(List<QuizResultSaveDto> gameResultSaveDtoList) {
        List<GameResult> gameResultList = new ArrayList<>();

        for (QuizResultSaveDto gameResultSaveDto : gameResultSaveDtoList) {
            FamilyMember familyMember = familyMemberRepository.findByUser_IdAndFamily_FamilyId
                    (gameResultSaveDto.getParticipantId(), gameResultSaveDto.getFamilyId())
                    .orElseThrow(()->new ExceptionResponse(CustomException.NOT_FOUND_FAMILYMEMBER_EXCEPTION));
            gameResultList.add(GameResult.createGameResult(gameResultSaveDto, familyMember.getUser(), familyMember.getFamily()));
        }

        gameResultRepoitory.saveAll(gameResultList);
    }

    
}
