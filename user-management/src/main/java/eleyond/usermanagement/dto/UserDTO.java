package eleyond.usermanagement.dto;

import eleyond.usermanagement.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO implements Serializable {
    private String username;
    private String firstName;
    private String lastName;
    private String role;
    private String password;
    private String[] devices;
}
