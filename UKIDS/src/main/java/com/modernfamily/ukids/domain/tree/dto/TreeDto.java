package com.modernfamily.ukids.domain.tree.dto;

import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.tree.entity.TreeType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TreeDto {

    private Long treeId;
    private Long exp;
    private boolean isComplete;
    private TreeType treeType;
    private Family family;
}
