package eleyond.usermanagement.controller;

import eleyond.usermanagement.dto.UserDTO;
import eleyond.usermanagement.model.Device;
import eleyond.usermanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/device")
@CrossOrigin(origins = "*")
public class UserDevicesController {
    private static final String DEVICES_BY_USERNAME = "/username/{username}";

    @Autowired
    private UserService userService;

    @GetMapping(DEVICES_BY_USERNAME)
    @CrossOrigin(origins = "*")
    public ResponseEntity<List<Device>> getDevices(@RequestParam String role, @PathVariable("username") String username) {
        System.out.println("getDevices");
        if (role.equals("ADMIN") || role.equals("USER")) {
            System.out.println("getDevices");
            return new ResponseEntity<List<Device>>(userService.getDevices(username), HttpStatus.OK);
        } else {
            return new ResponseEntity<List<Device>>((List<Device>) null, HttpStatus.UNAUTHORIZED);
        }

    }
}
