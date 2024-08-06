package com.modernfamily.ukids.domain.growthRecord.model.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.modernfamily.ukids.domain.familyMember.entity.FamilyMember;
import com.modernfamily.ukids.domain.familyMember.entity.FamilyRole;
import com.modernfamily.ukids.domain.familyMember.model.repository.FamilyMemberRepository;
import com.modernfamily.ukids.domain.growthFolder.model.repository.GrowthFolderRepository;
import com.modernfamily.ukids.domain.growthRecord.dto.*;
import com.modernfamily.ukids.domain.growthRecord.entity.GrowthRecord;
import com.modernfamily.ukids.domain.growthRecord.mapper.GrowthRecordMapper;
import com.modernfamily.ukids.domain.growthRecord.model.repository.GrowthRecordRepository;
import com.modernfamily.ukids.domain.photo.model.service.PhotoServiceImpl;
import com.modernfamily.ukids.domain.user.dto.CustomUserDetails;
import com.modernfamily.ukids.domain.user.entity.User;
import com.modernfamily.ukids.domain.user.model.repository.UserRepository;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import com.modernfamily.ukids.global.fileUpload.FileUpload;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GrowthRecordServiceImpl implements GrowthRecordService{

    private final GrowthRecordRepository growthRecordRepository;
    private final GrowthRecordMapper growthRecordMapper;
    private final UserRepository userRepository;
    private final GrowthFolderRepository growthFolderRepository;
    private final PhotoServiceImpl photoServiceImpl;

    @PersistenceContext
    private final EntityManager entityManager;
    private final FamilyMemberRepository familyMemberRepository;
    private final AmazonS3Client amazonS3Client;
    private final FileUpload fileUpload;


    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    @Override
    public void createGrowthRecord(GrowthRecordRequestDto growthRecordRequestDto) {
        growthFolderRepository.findByFolderId(growthRecordRequestDto.getFolderId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_GROWTHFOLDER_EXCEPTION));

        String id = CustomUserDetails.contextGetUserId();
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        growthRecordRequestDto.setWriterId(user.getUserId());

        Map<String, Object> uploadParam = null;

        if(growthRecordRequestDto.getMultipartFile() != null) {
            try {
                String path = "growthRecord";
                uploadParam = fileUpload.uploadFile(growthRecordRequestDto.getMultipartFile(), path);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            growthRecordRequestDto.setImageName(uploadParam.get("originalName").toString());
            growthRecordRequestDto.setImageS3Name(uploadParam.get("s3FileName").toString());
            growthRecordRequestDto.setImageUrl(uploadParam.get("uploadImageUrl").toString());
        }

        growthRecordRepository.save(growthRecordMapper.toGrowthRecordRequestEntity(growthRecordRequestDto));

    }

    @Override
    public void updateGrowthRecord(GrowthRecordUpdateDto growthRecordUpdateDto) throws IOException {
        GrowthRecord growthRecordInfo = growthRecordRepository.findByRecordId(growthRecordUpdateDto.getRecordId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_GROWTHRECORD_EXCEPTION));

        String id = CustomUserDetails.contextGetUserId();
        User user = userRepository.findById(id)
                        .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));
        if(user.getUserId() != growthRecordInfo.getUser().getUserId()){
            throw new ExceptionResponse(CustomException.NOT_SAME_WRITER_EXCEPTION);
        }

        Map<String, Object> uploadParam = null;
        if(growthRecordUpdateDto.getMultipartFile() != null) {
            try {
                String path = "growthRecord";
                uploadParam = fileUpload.uploadFile(growthRecordUpdateDto.getMultipartFile(), path);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            try {
                amazonS3Client.deleteObject(new DeleteObjectRequest(bucketName, growthRecordInfo.getImageS3Name()));
            } catch (AmazonS3Exception e) {
                throw new IOException("Error deleting photo ", e);
            }

            growthRecordUpdateDto.setImageName(uploadParam.get("originalName").toString());
            growthRecordUpdateDto.setImageS3Name(uploadParam.get("s3FileName").toString());
            growthRecordUpdateDto.setImageUrl(uploadParam.get("uploadImageUrl").toString());
        }
        else{
            growthRecordUpdateDto.setImageName(growthRecordInfo.getImageName());
            growthRecordUpdateDto.setImageS3Name(growthRecordInfo.getImageS3Name());
            growthRecordUpdateDto.setImageUrl(growthRecordInfo.getImageUrl());
        }

        growthRecordRepository.updateGrowthRecord(growthRecordMapper.toGrowthRecordUpdateEntity(growthRecordUpdateDto));

    }

    @Override
    public GrowthRecordResponseDto getGrowthRecord(GrowthRecordDetailDto growthRecordDetailDto) {
        GrowthRecord growthRecord = growthRecordRepository.findByRecordId(growthRecordDetailDto.getRecordId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_GROWTHRECORD_EXCEPTION));

        String id = CustomUserDetails.contextGetUserId();
        FamilyMember familyMember = familyMemberRepository.findByUser_IdAndFamily_FamilyId(id, growthRecordDetailDto.getFamilyId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.APPROVAL_FAMILYMEMBER_EXCEPTION));

        if(familyMember.getRole().equals(FamilyRole.ROLE_CHILD)){
            int currentYear = LocalDate.now().getYear();
            int birthYear = Integer.parseInt(familyMember.getUser().getBirthDate().substring(0, 4));
            if(currentYear - birthYear + 1 < 20){
                throw new ExceptionResponse(CustomException.NOT_PERMISSION_GROWTHRECORD_EXCEPTION);
            }
        }

        return growthRecordMapper.toGrowthRecordResponseDto(growthRecord);
    }

    @Override
    public GrowthRecordPaginationDto getGrowthRecords(Long folderId, int size, int page) {
        growthFolderRepository.findByFolderId(folderId)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_GROWTHFOLDER_EXCEPTION));

        Pageable pageable = PageRequest.of(page-1, size, Sort.by(Sort.Direction.DESC, "date"));
        Page<GrowthRecord> growthRecordPage = growthRecordRepository.findAllByFolder_FolderIdAndIsDeleteFalse(folderId, pageable);
        if(!growthRecordPage.hasContent()){
            throw new ExceptionResponse(CustomException.NOT_FOUND_GROWTHRECORD_EXCEPTION);
        }

        List<GrowthRecordResponseDto> growthRecords = new ArrayList<>();
        for(GrowthRecord growthRecord : growthRecordPage.getContent()){
            growthRecords.add(growthRecordMapper.toGrowthRecordResponseDto(growthRecord));
        }


        return new GrowthRecordPaginationDto(growthRecords, growthRecordPage.getTotalPages(), size, page);
    }

    @Override
    public void deleteGrowthRecord(Long recordId) throws IOException {
        GrowthRecord growthRecord = growthRecordRepository.findByRecordId(recordId)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_GROWTHRECORD_EXCEPTION));

        String id = CustomUserDetails.contextGetUserId();
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));
        if(user.getUserId() != growthRecord.getUser().getUserId()){
            throw new ExceptionResponse(CustomException.NOT_SAME_WRITER_EXCEPTION);
        }

        try {
            amazonS3Client.deleteObject(new DeleteObjectRequest(bucketName, growthRecord.getImageS3Name()));
        } catch (AmazonS3Exception e) {
            throw new IOException("Error deleting photo ", e);
        }

        growthRecordRepository.deleteGrowthRecord(recordId);
    }
}
