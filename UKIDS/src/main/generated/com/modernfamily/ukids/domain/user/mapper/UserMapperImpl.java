package com.modernfamily.ukids.domain.user.mapper;

import com.modernfamily.ukids.domain.user.dto.SignUpDto;
import com.modernfamily.ukids.domain.user.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-07-30T00:01:23+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.8.jar, environment: Java 17.0.10 (BellSoft)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toSignUpEntity(SignUpDto dto) {
        if ( dto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.id( dto.getId() );
        user.password( dto.getPassword() );
        user.name( dto.getName() );
        user.birthDate( dto.getBirthDate() );
        user.email( dto.getEmail() );
        user.phone( dto.getPhone() );
        user.profileImage( dto.getProfileImage() );
        user.role( dto.getRole() );

        return user.build();
    }
}
