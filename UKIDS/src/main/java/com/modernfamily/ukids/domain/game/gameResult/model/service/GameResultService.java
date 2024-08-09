package com.modernfamily.ukids.domain.game.gameResult.model.service;

import com.modernfamily.ukids.domain.game.gameResult.dto.GameResultSaveDto;

import java.util.List;

public interface GameResultService {

    void saveGameResult(List<GameResultSaveDto> gameResultSaveDtoList);

}
