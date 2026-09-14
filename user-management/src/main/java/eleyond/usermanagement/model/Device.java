package eleyond.usermanagement.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Device {

    private Long deviceID;
    private String description;
    private String address;
    private Long maxHourlyEnergyConsumption;
    private Long ownerID;
}
