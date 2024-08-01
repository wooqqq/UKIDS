package com.modernfamily.ukids.domain.tree.mapper;

import com.modernfamily.ukids.domain.tree.dto.TreeDto;
import com.modernfamily.ukids.domain.tree.entity.Tree;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-08-01T10:08:01+0900",
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

        tree.setFamily( treeDto.getFamily() );
        tree.setExp( treeDto.getExp() );

        return tree;
    }
}
