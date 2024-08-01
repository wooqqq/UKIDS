package com.modernfamily.ukids.domain.familyMember.controller;

import com.modernfamily.ukids.domain.familyMember.dto.FamilyMemberJoinDto;
import com.modernfamily.ukids.domain.familyMember.dto.FamilyMemberRequestDto;
import com.modernfamily.ukids.domain.familyMember.entity.FamilyMember;
import com.modernfamily.ukids.domain.familyMember.message.SuccessMessage;
import com.modernfamily.ukids.domain.familyMember.model.service.FamilyMemberService;
import com.modernfamily.ukids.global.util.HttpMethodCode;
import com.modernfamily.ukids.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/member")
@RequiredArgsConstructor
public class FamilyMemberController {

    private final FamilyMemberService familyMemberService;
    private final HttpResponseUtil httpResponseUtil;

    @PostMapping
    public ResponseEntity<Map<String, Object>> applyFamilyMember(@RequestBody FamilyMemberRequestDto familyMemberRequestDto){
        familyMemberService.applyFamilyMember(familyMemberRequestDto);

        return
                httpResponseUtil.createResponse(HttpMethodCode.POST, SuccessMessage.SUCCESS_APPLY_FAMILY_MEMBER);

    }

    @GetMapping("/approval/{familyId}")
    public ResponseEntity<Map<String, Object>> getFamilyMember(@PathVariable("familyId") Long familyId){
        List<FamilyMemberJoinDto> familyMembers = familyMemberService.getFamilyMember(familyId);

        return httpResponseUtil.createResponse(HttpMethodCode.GET, familyMembers);
    }
}
