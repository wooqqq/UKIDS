package com.modernfamily.ukids.domain.tree.mapper;

import com.modernfamily.ukids.domain.tree.dto.TreeDto;
import com.modernfamily.ukids.domain.tree.entity.Tree;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TreeMapper {
    TreeMapper INSTANCE = Mappers.getMapper(TreeMapper.class);

    TreeDto toDto(Tree tree);

    Tree toEntity(TreeDto treeDto);
}
