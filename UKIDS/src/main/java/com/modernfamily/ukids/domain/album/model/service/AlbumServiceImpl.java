package com.modernfamily.ukids.domain.album.model.service;

import com.modernfamily.ukids.domain.album.dto.request.AlbumCreateRequestDto;
import com.modernfamily.ukids.domain.album.dto.response.FamilyAlbumListResponseDto;
import com.modernfamily.ukids.domain.album.dto.response.AlbumInfoResponseDto;
import com.modernfamily.ukids.domain.album.dto.request.AlbumUpdateRequestDto;
import com.modernfamily.ukids.domain.album.dto.response.FamilyAlbumPagenationResponseDto;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

        Optional<Album> existAlbum =  albumRepository.findByDateAndFamily_FamilyId(requestDto.getDate(), requestDto.getFamilyId());
        if(!existAlbum.isEmpty())
            throw new ExceptionResponse(CustomException.DUPLICATED_ALBUM_EXCEPTION);

        Album album = Album.createAlbum(requestDto.getDate(), requestDto.getTitle(), family);

        albumRepository.save(album);
    }

    @Transactional
    public void updateAlbum(AlbumUpdateRequestDto requestDto) {

        Family family = checkFamilyMember(requestDto.getFamilyId());

        albumRepository.findByAlbumId(requestDto.getAlbumId()).orElseThrow(() ->
            new ExceptionResponse(CustomException.NOT_FOUND_ALBUM_EXCEPTION));

        Optional<Album> existAlbum =  albumRepository.findByDateAndFamily_FamilyId(requestDto.getDate(), requestDto.getFamilyId());
        if(!existAlbum.isEmpty())
            throw new ExceptionResponse(CustomException.DUPLICATED_ALBUM_EXCEPTION);


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

    public FamilyAlbumPagenationResponseDto getAlbumInfoList(int size, int page, Long familyId) {

        checkFamilyMember(familyId);

        Pageable pageable = PageRequest.of(--page, size);
        Page<Album> albumPage = albumRepository.findAllByFamily_FamilyId(familyId, pageable);

        List<Album> albumList = albumPage.getContent();
        List<FamilyAlbumListResponseDto> responseDtoList = new ArrayList<>();
        log.info("Album List size : {}", albumList.size());
        for (Album album : albumList) {
            responseDtoList.add(FamilyAlbumListResponseDto.createResponseDto(album));
        }

        FamilyAlbumPagenationResponseDto pagenationResponseDto = FamilyAlbumPagenationResponseDto
                .createResponseDto(responseDtoList, albumPage.getNumberOfElements(), albumPage.getNumber()+1, albumPage.getTotalPages());

        return pagenationResponseDto;
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


