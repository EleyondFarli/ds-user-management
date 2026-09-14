package eleyond.usermanagement.controller;

import eleyond.usermanagement.dto.UserDTO;
import eleyond.usermanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class AuthenticationController {
    private static final String LOGIN = "/login";
    private static final String LOGOUT = "/logout";

    @Autowired
    UserService userService;

    @PostMapping(path = LOGIN)
    public UserDTO login(@RequestBody Map<String, String> credentials)
    {
        return userService.login(credentials.get("username"), credentials.get("password"));
    }

    @GetMapping(LOGOUT)
    public String logout() {
        return "redirect:/login";
    }
}
