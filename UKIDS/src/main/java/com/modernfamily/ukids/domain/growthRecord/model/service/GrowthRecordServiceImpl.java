package com.modernfamily.ukids.domain.growthRecord.model.service;

import com.modernfamily.ukids.domain.growthFolder.dto.GrowthFolderPaginationDto;
import com.modernfamily.ukids.domain.growthFolder.model.repository.GrowthFolderRepository;
import com.modernfamily.ukids.domain.growthRecord.dto.GrowthRecordPaginationDto;
import com.modernfamily.ukids.domain.growthRecord.dto.GrowthRecordRequestDto;
import com.modernfamily.ukids.domain.growthRecord.dto.GrowthRecordResponseDto;
import com.modernfamily.ukids.domain.growthRecord.dto.GrowthRecordUpdateDto;
import com.modernfamily.ukids.domain.growthRecord.entity.GrowthRecord;
import com.modernfamily.ukids.domain.growthRecord.mapper.GrowthRecordMapper;
import com.modernfamily.ukids.domain.growthRecord.model.repository.GrowthRecordRepository;
import com.modernfamily.ukids.domain.user.dto.CustomUserDetails;
import com.modernfamily.ukids.domain.user.entity.User;
import com.modernfamily.ukids.domain.user.model.repository.UserRepository;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GrowthRecordServiceImpl implements GrowthRecordService{

    private final GrowthRecordRepository growthRecordRepository;
    private final GrowthRecordMapper growthRecordMapper;
    private final UserRepository userRepository;
    private final GrowthFolderRepository growthFolderRepository;

    @PersistenceContext
    private final EntityManager entityManager;

    @Override
    public void createGrowthRecord(GrowthRecordRequestDto growthRecordRequestDto) {
        growthFolderRepository.findByFolderId(growthRecordRequestDto.getFolderId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_GROWTHFOLDER_EXCEPTION));

        String id = CustomUserDetails.contextGetUserId();
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        growthRecordRequestDto.setWriterId(user.getUserId());

        growthRecordRepository.save(growthRecordMapper.toGrowthRecordRequestEntity(growthRecordRequestDto));

    }

    @Override
    public void updateGrowthRecord(GrowthRecordUpdateDto growthRecordUpdate) {
        GrowthRecord growthRecordInfo = growthRecordRepository.findByRecordId(growthRecordUpdate.getRecordId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_GROWTHRECORD_EXCEPTION));

        String id = CustomUserDetails.contextGetUserId();
        User user = userRepository.findById(id)
                        .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));
        if(user.getUserId() != growthRecordInfo.getUser().getUserId()){
            throw new ExceptionResponse(CustomException.NOT_SAME_WRITER_EXCEPTION);
        }

        growthRecordRepository.updateGrowthRecord(growthRecordMapper.toGrowthRecordUpdateEntity(growthRecordUpdate));

    }

    @Override
    public GrowthRecordResponseDto getGrowthRecord(Long recordId) {
        GrowthRecord growthRecord = growthRecordRepository.findByRecordId(recordId)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_GROWTHRECORD_EXCEPTION));



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
    public void deleteGrowthRecord(Long recordId) {
        GrowthRecord growthRecord = growthRecordRepository.findByRecordId(recordId)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_GROWTHRECORD_EXCEPTION));

        String id = CustomUserDetails.contextGetUserId();
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));
        if(user.getUserId() != growthRecord.getUser().getUserId()){
            throw new ExceptionResponse(CustomException.NOT_SAME_WRITER_EXCEPTION);
        }

        growthRecordRepository.deleteGrowthRecord(recordId);
    }
}
