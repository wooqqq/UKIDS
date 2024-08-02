package com.modernfamily.ukids.domain.growthFolder.controller;

import com.modernfamily.ukids.domain.growthFolder.dto.GrowthFolderRequestDto;
import com.modernfamily.ukids.domain.growthFolder.model.service.GrowthFolderServcie;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@RequestMapping("/growth-folder")
@RequiredArgsConstructor
public class GrowthFolderController {

    private final GrowthFolderServcie growthFolderServcie;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createGrowthFolder(@RequestBody GrowthFolderRequestDto growthFolderRequestDto) {
        return null;

    }
}
