package com.modernfamily.ukids.domain.caption.model.service;


import com.modernfamily.ukids.domain.caption.dto.request.CaptionCreateRequestDto;
import com.modernfamily.ukids.domain.caption.dto.request.CaptionUpdateRequestDto;
import com.modernfamily.ukids.domain.caption.entity.Caption;
import com.modernfamily.ukids.domain.caption.model.repository.CaptionRepository;
import com.modernfamily.ukids.domain.photo.entity.Photo;
import com.modernfamily.ukids.domain.photo.model.repository.PhotoRepository;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CaptionServiceImpl implements CaptionService {

    private final PhotoRepository photoRepository;
    private final CaptionRepository captionRepository;

    @Transactional
    public void createCaption(CaptionCreateRequestDto requestDto) {
        Photo photo = photoRepository.findByPhotoId(requestDto.getPhotoId())
                        .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PHOTO_EXCEPTION));


        Caption caption = Caption.createCaption(requestDto.getContent(), photo);
        captionRepository.save(caption);
    }

    @Transactional
    public void updateCaption(CaptionUpdateRequestDto requestDto) {
        Photo photo = photoRepository.findByPhotoId(requestDto.getPhotoId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PHOTO_EXCEPTION));

        Caption caption = captionRepository.findByCaptionId(requestDto.getCaptionId())
                .orElseThrow(()-> new ExceptionResponse(CustomException.NOT_FOUND_CAPTION_EXCEPTION));

        caption.updateCaption(requestDto.getContent());

        captionRepository.save(caption);
    }

    public void deleteCaption(Long captionId) {
        Caption caption = captionRepository.findByCaptionId(captionId)
                .orElseThrow(()-> new ExceptionResponse(CustomException.NOT_FOUND_CAPTION_EXCEPTION));

        caption.deleteCaption();

        captionRepository.save(caption);
    }

}
