package com.modernfamily.ukids.domain.photo.model.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import com.modernfamily.ukids.domain.album.entity.Album;
import com.modernfamily.ukids.domain.album.model.repository.AlbumRepository;
import com.modernfamily.ukids.domain.album.model.service.AlbumService;
import com.modernfamily.ukids.domain.family.dto.FamilyResponseDto;
import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.family.mapper.FamilyMapper;
import com.modernfamily.ukids.domain.familyMember.model.repository.FamilyMemberRepository;
import com.modernfamily.ukids.domain.photo.dto.request.PhotoSaveRequestDto;
import com.modernfamily.ukids.domain.photo.dto.response.PhotoInfoResponseDto;
import com.modernfamily.ukids.domain.photo.dto.response.PhotoListPagenationResponseDto;
import com.modernfamily.ukids.domain.photo.dto.response.PhotoListResponseDto;
import com.modernfamily.ukids.domain.photo.entity.Photo;
import com.modernfamily.ukids.domain.photo.model.repository.PhotoRepository;
import com.modernfamily.ukids.domain.user.dto.CustomUserDetails;
import com.modernfamily.ukids.domain.user.mapper.UserMapper;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import com.modernfamily.ukids.global.s3.S3Manager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class PhotoServiceImpl implements PhotoService {

    private final PhotoRepository photoRepository;
    private final AlbumRepository albumRepository;
    private final S3Manager s3Manager;
    private final FamilyMemberRepository familyMemberRepository;
    private final FamilyMapper familyMapper;
    private final UserMapper userMapper;

    @Transactional
    public void savePhoto(PhotoSaveRequestDto requestDto) throws IOException {

        Family family = checkFamilyMember(requestDto.getFamilyId());

        Album album = albumRepository.findByDateAndFamily_FamilyId(requestDto.getDate(), requestDto.getFamilyId())
                .orElseGet(() -> {
                    return albumRepository.save(
                            Album.createAlbum(
                                    requestDto.getDate(),
                                    requestDto.getDate().toString(),
                                    family
                            )
                    );
                });

        Map<String, Object> uploadParam = s3Manager.uploadFile(requestDto.getMultipartFile(), "photo");

        Photo photo = Photo.createPhoto(uploadParam, album);

        photoRepository.save(photo);
    }

    @Transactional
    public void deletePhoto(Long photoId) throws IOException {
        Photo photo = photoRepository.findByPhotoId(photoId)
                .orElseThrow(()-> new ExceptionResponse(CustomException.NOT_FOUND_PHOTO_EXCEPTION));

        checkFamilyMember(photo.getAlbum().getFamily().getFamilyId());

        s3Manager.deleteFile(photo.getPhotoS3Name());

        photo.deletePhoto();
        photoRepository.save(photo);
    }

    public PhotoInfoResponseDto getPhotoInfo(Long photoId) {
        Photo photo = photoRepository.findByPhotoId(photoId)
                .orElseThrow(()-> new ExceptionResponse(CustomException.NOT_FOUND_PHOTO_EXCEPTION));

        Family family = checkFamilyMember(photo.getAlbum().getFamily().getFamilyId());

        FamilyResponseDto familyResponseDto = familyMapper.toFamilyResponseDto(family);
        familyResponseDto.setUserFamilyDto(userMapper.toUserFamilyDto(family.getUser()));

        return PhotoInfoResponseDto.createResponseDto(photo, familyResponseDto);
    }

    public PhotoListPagenationResponseDto getPhotoList(int size, int page, Long albumId) {
        Album album = albumRepository.findByAlbumId(albumId)
                .orElseThrow(()-> new ExceptionResponse(CustomException.NOT_FOUND_ALBUM_EXCEPTION));

        Family family = checkFamilyMember(album.getFamily().getFamilyId());

        FamilyResponseDto familyResponseDto = familyMapper.toFamilyResponseDto(family);
        familyResponseDto.setUserFamilyDto(userMapper.toUserFamilyDto(family.getUser()));

        Pageable pageable = PageRequest.of(--page, size);
        Page<Photo> photoPage = photoRepository.findAllByAlbum_AlbumId(albumId, pageable);

        List<Photo> photoList = photoPage.getContent();
        List<PhotoListResponseDto> responseDtoList = new ArrayList<>();
        log.info("Album List size : {}", photoList.size());
        for (Photo photo : photoList) {
            responseDtoList.add(PhotoListResponseDto.createResponseDto(photo));
        }

        PhotoListPagenationResponseDto pagenationResponseDto =
                PhotoListPagenationResponseDto.createResponseDto
                        (photoPage.getNumberOfElements(), photoPage.getNumber()+1, photoPage.getTotalPages(), album, responseDtoList, familyResponseDto);

        return pagenationResponseDto;
    }

    private Family checkFamilyMember(Long familyId){
        String userId = CustomUserDetails.contextGetUserId();

        Family family = familyMemberRepository.findByUser_IdAndFamily_FamilyId(userId, familyId).orElseThrow(() ->
                new ExceptionResponse(CustomException.NOT_FOUND_FAMILYMEMBER_EXCEPTION)).getFamily();

        return family;
    }
}
