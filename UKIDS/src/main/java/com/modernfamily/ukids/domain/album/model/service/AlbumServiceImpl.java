package com.modernfamily.ukids.domain.album.model.service;

import com.modernfamily.ukids.domain.album.dto.AlbumCreateRequestDto;
import com.modernfamily.ukids.domain.album.entity.Album;
import com.modernfamily.ukids.domain.album.model.repository.AlbumRepository;
import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.family.model.repository.FamilyRepository;
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
    private final FamilyRepository  familyRepository;
    private final FamilyMemberRepository familyMemberRepository;

    @Transactional
    public void createAlbum(AlbumCreateRequestDto requestDto) {

        String userId = CustomUserDetails.contextGetUserId();

        Family family = familyRepository.findByFamilyId(requestDto.getFamilyId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_FAMILY_EXCEPTION));

        familyMemberRepository.findByUser_IdAndFamily_FamilyId(userId, family.getFamilyId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_FAMILYMEMBER_EXCEPTION));

        albumRepository.findByDate(requestDto.getDate())
                .orElseThrow(() -> new ExceptionResponse(CustomException.DUPLICATED_ALBUM_EXCEPTION));

        Album album = Album.createAlbum(requestDto, family);

        albumRepository.save(album);
    }
}
