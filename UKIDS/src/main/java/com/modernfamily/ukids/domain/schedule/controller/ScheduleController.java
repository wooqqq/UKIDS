package com.modernfamily.ukids.domain.schedule.controller;

import com.modernfamily.ukids.domain.schedule.dto.request.ScheduleCreateRequestDto;
import com.modernfamily.ukids.domain.schedule.message.SuccessMessage;
import com.modernfamily.ukids.domain.schedule.model.service.ScheduleService;
import com.modernfamily.ukids.global.util.HttpMethodCode;
import com.modernfamily.ukids.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

        return responseUtil.createResponse(HttpMethodCode.POST, SuccessMessage.SUCCESS_CREATE_SCHDULE);
    }

}
