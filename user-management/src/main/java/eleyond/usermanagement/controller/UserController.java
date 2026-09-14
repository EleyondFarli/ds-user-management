package eleyond.usermanagement.controller;

import eleyond.usermanagement.dto.UserDTO;
import eleyond.usermanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class UserController {
    private static final String SAVE_USER = "/save";
    private static final String ALL_USERS = "/all";
    private static final String DELETE_BY_USERNAME = "/delete/{delete_username}";
    private static final String USER_BY_USERNAME = "/username/{username}";
    private static final String UPDATE_BY_USERNAME = "/update/{update_username}";

    @Autowired
    private UserService userService;

    @GetMapping(ALL_USERS)
    public ResponseEntity<List< UserDTO >> getAll(@RequestParam String role) {
        if (role.equals("ADMIN")) {
            return new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping(USER_BY_USERNAME)
    @CrossOrigin(origins = "*")
    public UserDTO getUserByUsername(@RequestParam String role, @PathVariable("username") String username) {
        return userService.getUserByUsername(username);
    }

    @PostMapping(SAVE_USER)
    @CrossOrigin(origins = "*")
    public ResponseEntity addUser(@RequestParam String role, @RequestBody UserDTO userDTO) {
        if (role.equals("ADMIN")) {
            userService.saveUser(userDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping(DELETE_BY_USERNAME)
    @CrossOrigin(origins = "*")
    public ResponseEntity deleteByUsername(@RequestParam String role, @PathVariable("delete_username") String deleteUsername) {
        userService.deleteByUsername(deleteUsername);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(UPDATE_BY_USERNAME)
    @CrossOrigin(origins = "*")
    public UserDTO updateUser(@RequestParam String role, @PathVariable("update_username") String usernameToUpdate, @RequestBody UserDTO userDTO) {
        if (role.equals("ADMIN")) {
            return userService.updateUser(usernameToUpdate, userDTO);
        } else {
            return null;
        }
    }
}
