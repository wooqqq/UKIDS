package com.modernfamily.ukids.domain.family.controller;

import com.modernfamily.ukids.domain.family.dto.FamilyRequestDto;
import com.modernfamily.ukids.domain.family.dto.FamilyResponseDto;
import com.modernfamily.ukids.domain.family.message.SuccessMessage;
import com.modernfamily.ukids.domain.family.model.service.FamilyService;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import com.modernfamily.ukids.global.util.HttpMethodCode;
import com.modernfamily.ukids.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.Map;

@Controller
@RequestMapping("/family")
@RequiredArgsConstructor
public class FamilyController {

    private final FamilyService familyService;
    private final HttpResponseUtil responseUtil;

    @GetMapping("/{familyId}")
    public ResponseEntity<Map<String, Object>> getFamily(@PathVariable("familyId") Long familyId){
        FamilyResponseDto familyResponseDto = familyService.getFamily(familyId);

        System.out.println("family: " + familyResponseDto);

        return null;
    }

    @PostMapping
    public ResponseEntity<Map<String,Object>> createFamily(@RequestBody FamilyRequestDto familyRequestDto){
        try {
            familyService.createFamily(familyRequestDto);
        } catch (NoSuchAlgorithmException e) {
            throw new ExceptionResponse(CustomException.NOSUCH_ALGORITHM_EXCEPTION);
        }

        return responseUtil.createResponse(HttpMethodCode.POST, SuccessMessage.SUCCESS_CREATE_FAMILY);
    }


}
