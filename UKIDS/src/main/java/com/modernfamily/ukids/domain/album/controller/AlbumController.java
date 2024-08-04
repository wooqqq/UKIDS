package com.modernfamily.ukids.domain.album.controller;

import com.modernfamily.ukids.domain.album.dto.AlbumCreateRequestDto;
import com.modernfamily.ukids.domain.album.message.SuccessMessage;
import com.modernfamily.ukids.domain.album.model.service.AlbumService;
import com.modernfamily.ukids.global.util.HttpMethodCode;
import com.modernfamily.ukids.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/album")
@RequiredArgsConstructor
public class AlbumController {

    private final HttpResponseUtil httpResponseUtil;
    private final AlbumService albumService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createAlbum(AlbumCreateRequestDto requestDto){
        albumService.createAlbum(requestDto);

        return httpResponseUtil.createResponse(HttpMethodCode.POST, SuccessMessage.SUCCESS_CREATE_ALBUM);
    }
}
