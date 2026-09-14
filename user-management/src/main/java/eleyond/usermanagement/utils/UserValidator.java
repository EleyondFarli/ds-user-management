package eleyond.usermanagement.utils;

import eleyond.usermanagement.model.User;

import java.util.Optional;

public class UserValidator {
    public static void validatePassword(String password) {
        if (password.length() < 6)
            throw new IllegalPasswordException("The password should have more than 6 letters. Please insert the correct password");
    }

    public static User validateUser(Optional<User> user) {
        if (user.isEmpty())
            throw new NotFoundException("Username does not exist");
        return user.get();
    }

}
