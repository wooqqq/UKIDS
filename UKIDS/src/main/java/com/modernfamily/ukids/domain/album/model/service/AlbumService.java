package com.modernfamily.ukids.domain.album.model.service;

import com.modernfamily.ukids.domain.album.dto.AlbumCreateRequestDto;
import com.modernfamily.ukids.domain.album.dto.AlbumUpdateRequestDto;

public interface AlbumService {

    void createAlbum(AlbumCreateRequestDto requestDto);

    void updateAlbum(AlbumUpdateRequestDto requestDto);
}
