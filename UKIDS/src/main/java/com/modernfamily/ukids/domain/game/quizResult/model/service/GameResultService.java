package com.modernfamily.ukids.domain.game.quizResult.model.service;

import com.modernfamily.ukids.domain.game.quizResult.dto.GameResultSaveDto;

import java.util.List;

public interface GameResultService {

    void saveGameResult(List<GameResultSaveDto> gameResultSaveDtoList);

}
