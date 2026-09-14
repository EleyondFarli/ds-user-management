package eleyond.devicemanagement.repository;

import eleyond.devicemanagement.model.Device;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends CrudRepository<Device, Long> {
    @Override
    List< Device > findAll();

    List<Device> findByOwnerID(Long ownerID);
}
