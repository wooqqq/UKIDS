package com.modernfamily.ukids.domain.photo.model.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.modernfamily.ukids.domain.album.dto.request.AlbumCreateRequestDto;
import com.modernfamily.ukids.domain.album.entity.Album;
import com.modernfamily.ukids.domain.album.model.repository.AlbumRepository;
import com.modernfamily.ukids.domain.album.model.service.AlbumService;
import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.familyMember.model.repository.FamilyMemberRepository;
import com.modernfamily.ukids.domain.photo.dto.request.PhotoSaveRequestDto;
import com.modernfamily.ukids.domain.photo.dto.response.PhotoInfoResponseDto;
import com.modernfamily.ukids.domain.photo.entity.Photo;
import com.modernfamily.ukids.domain.photo.model.repository.PhotoRepository;
import com.modernfamily.ukids.domain.user.dto.CustomUserDetails;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class PhotoServiceImpl implements PhotoService {

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    private final AlbumService albumService;
    private final PhotoRepository photoRepository;
    private final AlbumRepository albumRepository;
    private final AmazonS3Client amazonS3Client;
    private final FamilyMemberRepository familyMemberRepository;

    @Transactional
    public void savePhoto(PhotoSaveRequestDto requestDto) throws IOException {

        String userId = CustomUserDetails.contextGetUserId();

        Family family = familyMemberRepository.findByUser_IdAndFamily_FamilyId(userId, requestDto.getFamilyId()).orElseThrow(() ->
                new ExceptionResponse(CustomException.NOT_FOUND_FAMILYMEMBER_EXCEPTION)).getFamily();

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

        Map<String, Object> uploadParam = uploadFile(requestDto.getMultipartFile());

        Photo photo = Photo.createPhoto(uploadParam, album);

        photoRepository.save(photo);
    }

    private Map<String, Object> uploadFile(MultipartFile multipartFile) throws IOException {
        Map<String, Object> uploadParam = new HashMap<>();

        String localFileName = UUID.randomUUID() +"_" +multipartFile.getOriginalFilename();
        File uploadFile = convert(multipartFile, localFileName)
                .orElseThrow(() -> new ExceptionResponse(CustomException.FAIL_TO_CONVERT_FILE_EXCEPTION));

        String generatedFileName = "photo/" + localFileName;

        uploadParam.put("originalName", uploadFile.getName());
        uploadParam.put("s3FileName", generatedFileName);

        try {
            amazonS3Client.putObject(
                    new PutObjectRequest(bucketName, generatedFileName, uploadFile)
                            .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (AmazonS3Exception e) {
            throw new IOException("Error uploading file", e);
        }
        String uploadImageUrl = amazonS3Client.getUrl(bucketName, generatedFileName).toString();
        uploadParam.put("uploadImageUrl", uploadImageUrl);

        uploadFile.delete();
        log.info("Local file deleted : {}", uploadFile.getAbsolutePath());

        return uploadParam;
    }

    private Optional<File> convert(MultipartFile file, String fileName) throws IOException {
        log.info("Converting file: {}", fileName);
        File convertFile = new File(fileName);
        if (convertFile.createNewFile()) {
            try (FileOutputStream fileOutputStream = new FileOutputStream(convertFile)) {
                fileOutputStream.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

    @Transactional
    public void deletePhoto(Long photoId) throws IOException {
        Photo photo = photoRepository.findByPhotoId(photoId)
                .orElseThrow(()-> new ExceptionResponse(CustomException.NOT_FOUND_PHOTO_EXCEPTION));

        String userId = CustomUserDetails.contextGetUserId();

        familyMemberRepository.findByUser_IdAndFamily_FamilyId(userId, photo.getAlbum().getFamily().getFamilyId()).orElseThrow(() ->
                new ExceptionResponse(CustomException.NOT_FOUND_FAMILYMEMBER_EXCEPTION));

        try {
            amazonS3Client.deleteObject(new DeleteObjectRequest(bucketName, photo.getPhotoS3Name()));
        } catch (AmazonS3Exception e) {
            throw new IOException("Error deleting photo ", e);
        }

        photo.deletePhoto();
        photoRepository.save(photo);
    }

    public PhotoInfoResponseDto getPhotoInfo(Long photoId) {
        Photo photo = photoRepository.findByPhotoId(photoId)
                .orElseThrow(()-> new ExceptionResponse(CustomException.NOT_FOUND_PHOTO_EXCEPTION));

        String userId = CustomUserDetails.contextGetUserId();

        familyMemberRepository.findByUser_IdAndFamily_FamilyId(userId, photo.getAlbum().getFamily().getFamilyId()).orElseThrow(() ->
                new ExceptionResponse(CustomException.NOT_FOUND_FAMILYMEMBER_EXCEPTION));

        return PhotoInfoResponseDto.createResponseDto(photo);
    }
}
