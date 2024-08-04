package com.modernfamily.ukids.domain.album.model.service;

import com.modernfamily.ukids.domain.album.dto.AlbumCreateRequestDto;
import com.modernfamily.ukids.domain.album.dto.AlbumInfoResponseDto;
import com.modernfamily.ukids.domain.album.dto.AlbumUpdateRequestDto;
import com.modernfamily.ukids.domain.album.entity.Album;
import com.modernfamily.ukids.domain.album.model.repository.AlbumRepository;
import com.modernfamily.ukids.domain.family.dto.FamilyPasswordDto;
import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.family.model.repository.FamilyRepository;
import com.modernfamily.ukids.domain.family.model.service.FamilyService;
import com.modernfamily.ukids.domain.familyMember.model.repository.FamilyMemberRepository;
import com.modernfamily.ukids.domain.user.dto.CustomUserDetails;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlbumServiceImpl implements AlbumService {

    private final AlbumRepository albumRepository;
    private final FamilyMemberRepository familyMemberRepository;
    private final FamilyService familyService;

    @Transactional
    public void createAlbum(AlbumCreateRequestDto requestDto) {

        Family family = checkFamilyMember(requestDto.getFamilyId());

        albumRepository.findByDate(requestDto.getDate()).orElseThrow(() ->
            new ExceptionResponse(CustomException.DUPLICATED_ALBUM_EXCEPTION));

        Album album = Album.createAlbum(requestDto, family);

        albumRepository.save(album);
    }

    @Transactional
    public void updateAlbum(AlbumUpdateRequestDto requestDto) {

        Family family = checkFamilyMember(requestDto.getFamilyId());

//        if(!familyService.checkPassword(new FamilyPasswordDto(family.getFamilyId(), requestDto.getPassword())))
//            throw new ExceptionResponse(CustomException.NOT_SAME_PASSWORD_EXCEPTION);

        albumRepository.findByAlbumId(requestDto.getAlbumId()).orElseThrow(() ->
            new ExceptionResponse(CustomException.NOT_FOUND_ALBUM_EXCEPTION));

        Album album = Album.updateAlbum(requestDto, family);

        albumRepository.save(album);

    }

    public AlbumInfoResponseDto getAlbumInfo(Long albumId) {

        Album album = albumRepository.findByAlbumId(albumId).orElseThrow(() ->
                new ExceptionResponse(CustomException.NOT_FOUND_ALBUM_EXCEPTION));

        checkFamilyMember(album.getFamily().getFamilyId());

        return AlbumInfoResponseDto.createAlbumInfoResponseDro(album);
    }

    public Family checkFamilyMember(Long familyId){
        String userId = CustomUserDetails.contextGetUserId();

        Family family = familyMemberRepository.findByUser_IdAndFamily_FamilyId(userId, familyId).orElseThrow(() ->
            new ExceptionResponse(CustomException.NOT_FOUND_FAMILYMEMBER_EXCEPTION)).getFamily();

        return family;
    }


}


