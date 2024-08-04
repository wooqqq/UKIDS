package com.modernfamily.ukids.domain.album.model.service;

import com.modernfamily.ukids.domain.album.dto.AlbumCreateRequestDto;
import com.modernfamily.ukids.domain.album.dto.AlbumInfoListResponseDto;
import com.modernfamily.ukids.domain.album.dto.AlbumInfoResponseDto;
import com.modernfamily.ukids.domain.album.dto.AlbumUpdateRequestDto;

import java.util.List;

public interface AlbumService {

    void createAlbum(AlbumCreateRequestDto requestDto);

    void updateAlbum(AlbumUpdateRequestDto requestDto);

    AlbumInfoResponseDto getAlbumInfo(Long albumId);

    List<AlbumInfoListResponseDto> getAlbumInfoList(Long familyId);

    void deleteAlbum(Long albumId);
}
