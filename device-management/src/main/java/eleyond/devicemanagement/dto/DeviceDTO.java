package eleyond.devicemanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeviceDTO implements Serializable {
    private Long deviceID;
    private String description;
    private String address;
    private Long maxHourlyEnergyConsumption;
    private Long ownerID;
}
