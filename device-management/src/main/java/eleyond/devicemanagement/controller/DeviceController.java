package eleyond.devicemanagement.controller;

import eleyond.devicemanagement.dto.DeviceDTO;
import eleyond.devicemanagement.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
    
@RestController
@RequestMapping("/device")
@CrossOrigin(origins = "*")
public class DeviceController {
    @Autowired
    private DeviceService deviceService;

    @GetMapping("/all")
    public List< DeviceDTO > getAll() {
        return deviceService.getAll();
    }


    @GetMapping("/{userID}")
    public List< DeviceDTO > getAllByID(@PathVariable("userID") Long ownerID) {
        return deviceService.getByUsername(ownerID);
    }
}
