package eleyond.usermanagement.repository;

import eleyond.usermanagement.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    @Override
    List< User > findAll();

    Optional<User> findByUsername(String username);

    @Override
    @Modifying
    <S extends User> S save(S entity);

    @Override
    @Modifying
    void delete(User entity);
}
