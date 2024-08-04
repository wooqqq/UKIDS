package com.modernfamily.ukids.domain.growthRecord.controller;

import com.modernfamily.ukids.domain.growthRecord.dto.GrowthRecordRequestDto;
import com.modernfamily.ukids.domain.growthRecord.dto.GrowthRecordResponseDto;
import com.modernfamily.ukids.domain.growthRecord.dto.GrowthRecordUpdateDto;
import com.modernfamily.ukids.domain.growthRecord.message.SuccessMessage;
import com.modernfamily.ukids.domain.growthRecord.model.service.GrowthRecordService;
import com.modernfamily.ukids.global.util.HttpMethodCode;
import com.modernfamily.ukids.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/growth-record")
@RequiredArgsConstructor
public class GrowthRecordController {

    private final GrowthRecordService growthRecordService;
    private final HttpResponseUtil httpResponseUtil;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createGrowthRecord(@RequestBody GrowthRecordRequestDto growthRecordRequestDto){

        GrowthRecordResponseDto growthRecordResponseDto = growthRecordService.createGrowthRecord(growthRecordRequestDto);

        return httpResponseUtil.createResponse(HttpMethodCode.POST, growthRecordResponseDto);
    }

    @PutMapping("/{recordId}")
    public ResponseEntity<Map<String, Object>> updateGrowthRecord(@RequestBody GrowthRecordUpdateDto growthRecordUpdateDto,
                                                                  @PathVariable("recordId") Long recordId){
        growthRecordUpdateDto.setRecordId(recordId);
        GrowthRecordResponseDto growthRecordResponseDto = growthRecordService.updateGrowthRecord(growthRecordUpdateDto);

        return httpResponseUtil.createResponse(HttpMethodCode.POST, growthRecordResponseDto);
    }

    @GetMapping("/{recordId}")
    public ResponseEntity<Map<String,Object>> getGrowthRecord(@PathVariable("recordId") Long recordId){
        GrowthRecordResponseDto growthRecordResponseDto = growthRecordService.getGrowthRecord(recordId);

        return httpResponseUtil.createResponse(HttpMethodCode.GET, growthRecordResponseDto);
    }

    @GetMapping("/all/{folderId}")
    public ResponseEntity<Map<String,Object>> getGrowthRecords(@PathVariable("folderId") Long folderId){
        List<GrowthRecordResponseDto> growthRecordResponseDtoList = growthRecordService.getGrowthRecords(folderId);

        return httpResponseUtil.createResponse(HttpMethodCode.GET, growthRecordResponseDtoList);
    }

    @DeleteMapping("/{recordId}")
    public ResponseEntity<Map<String,Object>> deleteGrowthRecord(@PathVariable("recordId") Long recordId){
        growthRecordService.deleteGrowthRecord(recordId);

        return httpResponseUtil.createResponse(HttpMethodCode.DELETE, SuccessMessage.SUCCESS_DELETE_GROWTHRECORD);
    }

}
