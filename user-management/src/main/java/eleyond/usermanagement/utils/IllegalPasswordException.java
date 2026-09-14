package eleyond.usermanagement.utils;

public class IllegalPasswordException extends RuntimeException {
    public IllegalPasswordException(String message){
        super(message);
    }
}
