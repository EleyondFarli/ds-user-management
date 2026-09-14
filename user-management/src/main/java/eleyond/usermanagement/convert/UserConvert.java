package eleyond.usermanagement.convert;

import eleyond.usermanagement.dto.UserDTO;
import eleyond.usermanagement.model.User;
import eleyond.usermanagement.model.UserRole;

import java.util.stream.Collectors;

public class UserConvert {
    public static final UserDTO convertUserToDTO(User user) {
        UserDTO userDTO = UserDTO.builder()
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().getName())
                .build();
        return userDTO;
    }

    public static final User convertDTOToUser(UserDTO userDTO) {
        User user = User.builder()
                .username(userDTO.getUsername())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .role(userDTO.getRole().equals("ADMIN") ? new UserRole(1, userDTO.getRole()): new UserRole(2, userDTO.getRole()))
                .password(userDTO.getPassword())
                .build();
        return user;
    }
}
