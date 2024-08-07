package com.modernfamily.ukids.domain.tree.controller;

import com.modernfamily.ukids.domain.tree.dto.request.TreeCreateRequestDto;
import com.modernfamily.ukids.domain.tree.dto.request.TreeUpdateRequestDto;
import com.modernfamily.ukids.domain.tree.entity.Tree;
import com.modernfamily.ukids.domain.tree.model.service.TreeService;
import com.modernfamily.ukids.global.util.HttpMethodCode;
import com.modernfamily.ukids.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tree")
@RequiredArgsConstructor
public class TreeController {

    private final HttpResponseUtil responseUtil;
    private final TreeService treeService;

    @PostMapping
    public ResponseEntity<?> createTree(@RequestBody TreeCreateRequestDto treeDto) {
        Tree savedTree = treeService.createTree(treeDto);
        return responseUtil.createResponse(HttpMethodCode.POST, savedTree);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findByFamilyId(@PathVariable("id") Long familyId) {
        Tree tree = treeService.findByFamilyId(familyId);
        return responseUtil.createResponse(HttpMethodCode.GET, tree);
    }

    @PutMapping
    public ResponseEntity<?> updateTreeExp(@RequestBody TreeUpdateRequestDto treeDto) {
        Tree grownTree = treeService.updateTree(treeDto);
        return responseUtil.createResponse(HttpMethodCode.PUT, grownTree);
    }

}
