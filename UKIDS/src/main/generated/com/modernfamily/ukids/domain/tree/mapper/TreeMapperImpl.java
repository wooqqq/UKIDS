package com.modernfamily.ukids.domain.tree.mapper;

import com.modernfamily.ukids.domain.tree.dto.TreeDto;
import com.modernfamily.ukids.domain.tree.entity.Tree;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-07-31T14:38:58+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.8.jar, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class TreeMapperImpl implements TreeMapper {

    @Override
    public TreeDto toDto(Tree tree) {
        if ( tree == null ) {
            return null;
        }

        TreeDto treeDto = new TreeDto();

        return treeDto;
    }

    @Override
    public Tree toEntity(TreeDto treeDto) {
        if ( treeDto == null ) {
            return null;
        }

        Tree tree = new Tree();

        tree.exp = treeDto.getExp();

        return tree;
    }
}
