package com.controllers;
import com.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.models.User;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    //Method to get user - used by user of worker app
    @RequestMapping(method = RequestMethod.GET )
    public ResponseEntity<User> getUser(@RequestParam("login") String login){
        User foundUser = userRepository.getUser(login);
        if(foundUser != null){
            foundUser.deletePassword();
            return new ResponseEntity<User>(foundUser, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    //Method to change password
    @RequestMapping(value = "/password", method = RequestMethod.POST )
    public ResponseEntity<User> changePassword(@RequestBody User user){
        User changedUser = userRepository.changePassword(user);
        if(changedUser != null){
            return new ResponseEntity<User>(changedUser , HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    //Method to login
    @RequestMapping(value = "/login", method = RequestMethod.GET )
    public ResponseEntity<User> login(@RequestParam("login") String login, @RequestParam("password") String password){
        User foundUser = userRepository.login(login,password);
        if(foundUser!=null){
            return new ResponseEntity<User>(foundUser, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    //Method to update mount of points - used by user of worker app
    @RequestMapping(value = "/update/points", method = RequestMethod.GET)
    public ResponseEntity<User> updatePoints(@RequestParam("login") String login, @RequestParam("points") Integer points){
        return updateUserState(login, points, "points");
    }

    //Method to update mount of stamps - used by user of worker app
    @RequestMapping(value = "/update/stamps", method = RequestMethod.GET)
    public ResponseEntity<User> updateStamps(@RequestParam("login") String login, @RequestParam("stamps") Integer stamps){
        return updateUserState(login, stamps, "stamps");
    }

    //Method helping change amount of stamps or points
    private ResponseEntity<User> updateUserState(String login, Integer state, String stateName){
        User foundUser = userRepository.updateState(login,state,stateName);
        if(foundUser!=null){
            return new ResponseEntity<User>(foundUser, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    //Method to register user
    @RequestMapping(value = "/register", method = RequestMethod.POST )
    public ResponseEntity<User> register(@RequestBody User user){
        User registeredUser = userRepository.register(user);
        if(registeredUser !=null){
            return new ResponseEntity<User>(registeredUser , HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }

    //Method to delete user
    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@RequestParam String login) {
        boolean action = userRepository.delete(login);
        if(action) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
}