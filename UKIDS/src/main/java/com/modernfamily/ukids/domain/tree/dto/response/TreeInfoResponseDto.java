package com.modernfamily.ukids.domain.tree.dto.response;

import com.modernfamily.ukids.domain.tree.entity.Tree;
import lombok.Builder;
import lombok.Getter;

@Getter
public class TreeInfoResponseDto {

    private Long treeId;

    private Long exp;

    private boolean isComplete;

    private Long familyId;

    @Builder
    private TreeInfoResponseDto(Long treeId, Long exp, boolean isComplete, Long familyId) {
        this.treeId = treeId;
        this.exp = exp;
        this.isComplete = isComplete;
        this.familyId = familyId;
    }

    public static TreeInfoResponseDto createResponseDto(Tree tree) {
        return TreeInfoResponseDto.builder()
                .treeId(tree.getTreeId())
                .exp(tree.getExp())
                .isComplete(tree.isComplete())
                .familyId(tree.getFamily().getFamilyId())
                .build();
    }

}
