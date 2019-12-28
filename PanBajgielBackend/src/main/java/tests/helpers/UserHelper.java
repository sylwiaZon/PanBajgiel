package tests.helpers;

import com.models.User;

public class UserHelper {
    private User responseUser;

    public UserHelper() {
        String login = "login@mail.com";
        String password = "password";
        String name = "name";
        Integer points = 0;
        Integer stamps = 0;
        Integer client = 1;
        this.responseUser = new User(login,password,name,points,stamps,client);
    }

    public User getUser(){
        return responseUser;
    }
}
