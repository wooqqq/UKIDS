package com.modernfamily.ukids.domain.tree.controller;

import com.modernfamily.ukids.domain.tree.model.service.TreeService;
import com.modernfamily.ukids.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tree")
@RequiredArgsConstructor
public class TreeController {

    private final HttpResponseUtil responseUtil;
    private final TreeService treeService;

}
