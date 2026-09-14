package eleyond.devicemanagement.service;

import eleyond.devicemanagement.convert.DeviceConvert;
import eleyond.devicemanagement.dto.DeviceDTO;
import eleyond.devicemanagement.model.Device;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DeviceService {
    @Autowired
    private eleyond.devicemanagement.repository.DeviceRepository deviceRepository;

    // the method will return all the devices from the db
    public List< eleyond.devicemanagement.dto.DeviceDTO > getAll() {
        List< Device > devices = deviceRepository.findAll();

        if (devices.isEmpty()) return null;

        List< eleyond.devicemanagement.dto.DeviceDTO > deviceDTOS = new ArrayList<>();
        for (Device device : devices) {
            deviceDTOS.add(eleyond.devicemanagement.convert.DeviceConvert.convertDeviceToDTO(device));
        }

        return deviceDTOS;
    }

    public List<DeviceDTO> getByUsername(Long ownerID) {
        List<Device> devices = deviceRepository.findByOwnerID(ownerID);

        if (devices.isEmpty()) return null;

        List<DeviceDTO> deviceDTOS = new ArrayList<>();
        for (Device device : devices) {
            deviceDTOS.add(DeviceConvert.convertDeviceToDTO(device));
        }

        return deviceDTOS;
    }
}
