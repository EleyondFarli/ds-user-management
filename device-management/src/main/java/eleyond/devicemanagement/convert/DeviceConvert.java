package eleyond.devicemanagement.convert;

import eleyond.devicemanagement.dto.DeviceDTO;
import eleyond.devicemanagement.model.Device;

import java.util.stream.Collectors;

public class DeviceConvert {
    public static final DeviceDTO convertDeviceToDTO(Device device) {
        DeviceDTO deviceDTO = DeviceDTO.builder()
                .deviceID(device.getDeviceID())
                .description(device.getDescription())
                .address(device.getAddress())
                .maxHourlyEnergyConsumption(device.getMaxHourlyEnergyConsumption())
                .ownerID(device.getOwnerID())
                .build();
        return deviceDTO;
    }
}
