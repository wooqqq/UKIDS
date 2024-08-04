package com.modernfamily.ukids.domain.pictureDiary.controller;

import com.modernfamily.ukids.domain.pictureDiary.dto.PictureDiaryRequestDto;
import com.modernfamily.ukids.domain.pictureDiary.dto.PictureDiaryResponseDto;
import com.modernfamily.ukids.domain.pictureDiary.dto.PictureDiaryUpdateDto;
import com.modernfamily.ukids.domain.pictureDiary.message.SuccessMessage;
import com.modernfamily.ukids.domain.pictureDiary.model.service.PictureDiaryService;
import com.modernfamily.ukids.global.util.HttpMethodCode;
import com.modernfamily.ukids.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/picture-diary")
@RequiredArgsConstructor
public class PictureDiaryController {
    private final PictureDiaryService pictureDiaryService;
    private final HttpResponseUtil httpResponseUtil;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createPictureDiary(@RequestBody PictureDiaryRequestDto pictureDiaryRequestDto){
        System.out.println(pictureDiaryRequestDto);
        pictureDiaryService.createPictureDiary(pictureDiaryRequestDto);

        return httpResponseUtil.createResponse(HttpMethodCode.POST, SuccessMessage.SUCCESS_CREATE_PICTUREDIARY);
    }

    // 세부조회
//    @GetMapping("/{pictureDiaryId}")
//    public ResponseEntity<Map<String, Object>> getPictureDiary(@PathVariable("pictureDiaryId") Long pictureDiaryId){
//        PictureDiaryResponseDto pictureDiaryResponseDto = pictureDiaryService.getPictureDiary(pictureDiaryId);
//
//        return httpResponseUtil.createResponse(HttpMethodCode.POST, pictureDiaryResponseDto);
//    }

    // 날짜로 조회
    @GetMapping("/{familyId}")
    public ResponseEntity<Map<String, Object>> getPictureDiariesByDate(@PathVariable("familyId") Long familyId,
                                                                       @RequestParam("date") LocalDate date){
        List<PictureDiaryResponseDto> pictureDiaryResponseDto = pictureDiaryService.getPictureDiariesByDate(familyId, date);

        return httpResponseUtil.createResponse(HttpMethodCode.POST, pictureDiaryResponseDto);
    }
    // 전체 조회
    @GetMapping("/all/{familyId}")
    public ResponseEntity<Map<String, Object>> getPictureDiariesByDate(@PathVariable("familyId") Long familyId){
        List<PictureDiaryResponseDto> pictureDiaryResponseDto = pictureDiaryService.getPictureDiariesAll(familyId);

        return httpResponseUtil.createResponse(HttpMethodCode.POST, pictureDiaryResponseDto);
    }

    @DeleteMapping("/{pictureDiaryId}")
    public ResponseEntity<Map<String, Object>> deletePictureDiary(@PathVariable("pictureDiaryId") Long pictureDiaryId){
        pictureDiaryService.deletePictureDiary(pictureDiaryId);
        return httpResponseUtil.createResponse(HttpMethodCode.POST, SuccessMessage.SUCCESS_DELETE_PICTUREDIARY);
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updatePictureDiary(@RequestBody PictureDiaryUpdateDto pictureDiaryUpdateDto){
        System.out.println(pictureDiaryUpdateDto);
        pictureDiaryService.updatePictureDiary(pictureDiaryUpdateDto);

        return httpResponseUtil.createResponse(HttpMethodCode.PUT, SuccessMessage.SUCCESS_UPDATE_PICTUREDIARY);
    }


}
