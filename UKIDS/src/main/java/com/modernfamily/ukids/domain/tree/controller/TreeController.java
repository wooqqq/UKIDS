package com.modernfamily.ukids.domain.tree.controller;

import com.modernfamily.ukids.domain.tree.dto.TreeDto;
import com.modernfamily.ukids.domain.tree.entity.Tree;
import com.modernfamily.ukids.domain.tree.model.service.TreeService;
import com.modernfamily.ukids.global.util.HttpMethodCode;
import com.modernfamily.ukids.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tree")
@RequiredArgsConstructor
public class TreeController {

    private final HttpResponseUtil responseUtil;
    private final TreeService treeService;

    @PostMapping
    public ResponseEntity<?> createTree(@RequestBody TreeDto treeDto) {

        Tree savedTree = treeService.save(treeDto);

        return responseUtil.createResponse(HttpMethodCode.POST, savedTree);
    }

}
