package com.modernfamily.ukids.domain.schedule.controller;

import com.modernfamily.ukids.domain.schedule.dto.request.ScheduleCreateRequestDto;
import com.modernfamily.ukids.domain.schedule.dto.request.ScheduleUpdateRequestDto;
import com.modernfamily.ukids.domain.schedule.message.SuccessMessage;
import com.modernfamily.ukids.domain.schedule.model.service.ScheduleService;
import com.modernfamily.ukids.global.util.HttpMethodCode;
import com.modernfamily.ukids.global.util.HttpResponseUtil;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final HttpResponseUtil responseUtil;
    private final ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createSchedule(@RequestBody ScheduleCreateRequestDto requestDto) {
        scheduleService.createSchedule(requestDto);

        return responseUtil.createResponse(HttpMethodCode.POST, SuccessMessage.SUCCESS_CREATE_SCHDULE.getMessage());
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateSchedule(@RequestBody ScheduleUpdateRequestDto requestDto) {
        scheduleService.updateSchedule(requestDto);

        return responseUtil.createResponse(HttpMethodCode.POST, SuccessMessage.SUCCESS_UPDATE_SCHDULE.getMessage());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteSchedule(@PathVariable("id") Long scheduleId) {
        scheduleService.deleteSchedule(scheduleId);

        return responseUtil.createResponse(HttpMethodCode.DELETE, SuccessMessage.SUCCESS_DELETE_SCHDULE.getMessage());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getScheduleInfo(@PathVariable("id") Long scheduleId) {
        return responseUtil.createResponse(HttpMethodCode.GET, scheduleService.getScheduleInfo(scheduleId));
    }

    @GetMapping("/all/{id}")
    public ResponseEntity<Map<String, Object>> getScheduleInfo(@PathVariable("id") Long familyId,
                                                               @RequestParam("date") LocalDate date) {
        return responseUtil.createResponse(HttpMethodCode.GET, scheduleService.getScheduleList(familyId, date));
    }

}
