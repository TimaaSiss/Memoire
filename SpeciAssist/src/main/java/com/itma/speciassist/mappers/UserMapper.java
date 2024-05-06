package com.itma.speciassist.mappers;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.itma.speciassist.dto.SignUpDto;
import com.itma.speciassist.dto.UserDto;
import com.itma.speciassist.model.User;



@Mapper(componentModel="spring")
public interface UserMapper {
    UserDto toUserDto(User user);

    @Mapping(target="password", ignore=true)
    User signUpToUser(SignUpDto signUpDto);
}
