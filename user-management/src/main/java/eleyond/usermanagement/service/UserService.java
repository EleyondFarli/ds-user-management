package eleyond.usermanagement.service;

import eleyond.usermanagement.convert.UserConvert;
import eleyond.usermanagement.dto.UserDTO;
import eleyond.usermanagement.model.Device;
import eleyond.usermanagement.model.User;
import eleyond.usermanagement.model.UserRole;
import eleyond.usermanagement.repository.UserRepository;
import eleyond.usermanagement.utils.IllegalPasswordException;
import eleyond.usermanagement.utils.NotFoundException;
import eleyond.usermanagement.utils.PasswordEncrypter;
import eleyond.usermanagement.utils.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // the method will return all the users from the db
    public List< UserDTO > getAll() {
        List< User > users = userRepository.findAll();

        if (users.isEmpty()) return null;

        List<UserDTO> userDTOs = new ArrayList<>();
        for (User user : users) {
            userDTOs.add(UserConvert.convertUserToDTO(user));
        }

        return userDTOs;
    }

    public void saveUser(UserDTO userDTO) {
        User user = UserConvert.convertDTOToUser(userDTO);
        user.setPassword(PasswordEncrypter.encryptPassword(user.getPassword()));
        userRepository.save(user);
    }

    public void deleteByUsername(String username) {
        Optional< User > user = userRepository.findByUsername(username);
        if(user.isPresent()) {
            userRepository.delete(user.get());
        } else {
            throw new NotFoundException("User with given username was not found");
        }
    }

    // the method will return the user with the corresponding username
    public UserDTO getUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent()) {
            return UserConvert.convertUserToDTO(user.get());
        } else {
            throw new NotFoundException("User with given username was not found");
        }
    }

    public UserDTO updateUser(String username, UserDTO userDTO) {
        Optional< User > userUpdated = userRepository.findByUsername(username);
        if(userUpdated.isPresent()) {
            User user = userUpdated.get();
            user.setFirstName(userDTO.getFirstName());
            user.setLastName(userDTO.getLastName());
            user.setRole(userDTO.getRole().equals("ADMIN") ? new UserRole(1, userDTO.getRole()): new UserRole(2, userDTO.getRole()));
            userRepository.save(user);
            return UserConvert.convertUserToDTO(user);
        } else {
            throw new NotFoundException("User with given username was not found");
        }
    }

    public UserDTO login(String username, String password) {
        Optional< User > user = userRepository.findByUsername(username);
        if(user.isPresent()) {
            if (Objects.equals(user.get().getPassword(), PasswordEncrypter.encryptPassword(password))){
                return UserConvert.convertUserToDTO(user.get());
            } else {
                throw new IllegalPasswordException("Password is incorrect");
            }
        } else {
            throw new NotFoundException("User with given username was not found");
        }
    }

    public List<Device> getDevices(String username) {
        Optional< User > user = userRepository.findByUsername(username);
        if(user.isPresent()) {
            RestTemplate restTemplate = new RestTemplate();
            String uri = "http://localhost:8082/device/" + user.get().getUserID();
            HttpEntity<String> entity = new HttpEntity<>(null, null);
            ResponseEntity<?> result =
                    restTemplate.exchange(uri, HttpMethod.GET, entity, List.class);
            return (List<Device>) result.getBody();
        } else {
            throw new NotFoundException("User with given username was not found");
        }
    }
}
