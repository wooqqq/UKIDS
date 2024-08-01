package com.modernfamily.ukids.domain.tree.model.service;

import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.family.repository.FamilyRepository;
import com.modernfamily.ukids.domain.tree.dto.TreeDto;
import com.modernfamily.ukids.domain.tree.entity.Tree;
import com.modernfamily.ukids.domain.tree.mapper.TreeMapper;
import com.modernfamily.ukids.domain.tree.model.repository.TreeRepository;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import org.springframework.stereotype.Service;

@Service
public class TreeServiceImpl implements TreeService {

    private TreeRepository treeRepository;
    private FamilyRepository familyRepository;
    private TreeMapper treeMapper;

    public TreeServiceImpl(TreeRepository treeRepository, FamilyRepository familyRepository, TreeMapper treeMapper) {
        this.treeRepository = treeRepository;
        this.familyRepository = familyRepository;
        this.treeMapper = treeMapper;
    }

    @Override
    public Tree save(TreeDto treeDto) {
        // familyId로 Family 엔티티 조회
        Family family = familyRepository.findById(treeDto.getFamilyId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_FAMILY_EXCEPTION));

        Tree tree = treeMapper.toEntity(treeDto);
        tree.setFamily(family);

        return treeRepository.save(tree);
    }

    // 가족 id를 통한 현재 나무 조회
    @Override
    public Tree findByFamilyId(Long familyId) {
        // familyId로 Family 엔티티 조회
        Family family = familyRepository.findById(familyId)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_FAMILY_EXCEPTION));

        // family로 Tree 엔티티 조회
        Tree tree = treeRepository.findByFamily(family)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_TREE_EXCEPTION));

        // 가족 id를 통해 찾은 나무가 isComplete == false인지 확인하는 작업 필요
        if (tree.isComplete())
            throw new ExceptionResponse(CustomException.ALREADY_COMPLETED_TREE_EXCEPTION);

        return tree;
    }

    // 가족 id를 통해 나무 경험치 업데이트
    @Override
    public Tree updateTree(TreeDto treeDto) {
        // familyId로 Family 엔티티 조회
        Family family = familyRepository.findById(treeDto.getFamilyId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_FAMILY_EXCEPTION));

        // family로 Tree 엔티티 조회
        Tree tree = treeRepository.findByFamily(family)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_TREE_EXCEPTION));

        // tree가 이미 완성된 나무인지 확인
        if (tree.isComplete())
            throw new ExceptionResponse(CustomException.ALREADY_COMPLETED_TREE_EXCEPTION);

        // point를 exp에 저장
        Long grownExp = tree.getExp() + treeDto.getPoint();

        // 성장 exp 가 최대치를 넘는지 안넘는지 체크
        if (grownExp >= 1000)
            tree.setIsComplete(true);
        tree.setExp(grownExp);

        return treeRepository.save(tree);
    }

}
