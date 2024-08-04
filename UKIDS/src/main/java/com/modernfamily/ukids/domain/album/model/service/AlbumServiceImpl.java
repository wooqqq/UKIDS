package com.modernfamily.ukids.domain.album.model.service;

import com.modernfamily.ukids.domain.album.dto.AlbumCreateRequestDto;
import com.modernfamily.ukids.domain.album.dto.AlbumInfoListResponseDto;
import com.modernfamily.ukids.domain.album.dto.AlbumInfoResponseDto;
import com.modernfamily.ukids.domain.album.dto.AlbumUpdateRequestDto;
import com.modernfamily.ukids.domain.album.entity.Album;
import com.modernfamily.ukids.domain.album.model.repository.AlbumRepository;
import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.family.model.service.FamilyService;
import com.modernfamily.ukids.domain.familyMember.model.repository.FamilyMemberRepository;
import com.modernfamily.ukids.domain.user.dto.CustomUserDetails;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class AlbumServiceImpl implements AlbumService {

    private final AlbumRepository albumRepository;
    private final FamilyMemberRepository familyMemberRepository;
    private final FamilyService familyService;

    @Transactional
    public void createAlbum(AlbumCreateRequestDto requestDto) {

        Family family = checkFamilyMember(requestDto.getFamilyId());

        Optional<Album> existAlbum =  albumRepository.findByDate(requestDto.getDate());

        if(!existAlbum.isEmpty())
            throw new ExceptionResponse(CustomException.DUPLICATED_ALBUM_EXCEPTION);

        Album album = Album.createAlbum(requestDto.getDate(), requestDto.getTitle(), family);

        albumRepository.save(album);
    }

    @Transactional
    public void updateAlbum(AlbumUpdateRequestDto requestDto) {
        // 비밀번호 확인 가정

        Family family = checkFamilyMember(requestDto.getFamilyId());

        albumRepository.findByAlbumId(requestDto.getAlbumId()).orElseThrow(() ->
            new ExceptionResponse(CustomException.NOT_FOUND_ALBUM_EXCEPTION));

        Album album = Album.createAlbum(requestDto.getDate(), requestDto.getTitle(), family);
        album.updateAlbum(requestDto.getAlbumId());

        albumRepository.save(album);

    }

    public AlbumInfoResponseDto getAlbumInfo(Long albumId) {

        Album album = albumRepository.findByAlbumId(albumId).orElseThrow(() ->
                new ExceptionResponse(CustomException.NOT_FOUND_ALBUM_EXCEPTION));

        checkFamilyMember(album.getFamily().getFamilyId());

        AlbumInfoResponseDto responseDto = AlbumInfoResponseDto.createAlbumInfoResponseDto(album);
        return responseDto;
    }

    public List<AlbumInfoListResponseDto> getAlbumInfoList(Long familyId) {

        checkFamilyMember(familyId);
        List<Album> albumList = albumRepository.findAllByFamily_FamilyId(familyId);

        List<AlbumInfoListResponseDto> responseDtoList = new ArrayList<>();
        for (Album album : albumList) {
            responseDtoList.add(AlbumInfoListResponseDto.createResponseDro(album));
        }

        return responseDtoList;
    }

    @Transactional
    public void deleteAlbum(Long albumId){
        // 비밀번호 확인 가정

        Album album = albumRepository.findByAlbumId(albumId).orElseThrow(() ->
                new ExceptionResponse(CustomException.NOT_FOUND_ALBUM_EXCEPTION));

        checkFamilyMember(album.getFamily().getFamilyId());

        album.deleteAlbum();
        albumRepository.save(album);
    }

    public Family checkFamilyMember(Long familyId){
        String userId = CustomUserDetails.contextGetUserId();

        Family family = familyMemberRepository.findByUser_IdAndFamily_FamilyId(userId, familyId).orElseThrow(() ->
            new ExceptionResponse(CustomException.NOT_FOUND_FAMILYMEMBER_EXCEPTION)).getFamily();

        return family;
    }


}


