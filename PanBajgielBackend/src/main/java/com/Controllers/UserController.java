package com.Controllers;
import com.Models.User;
import com.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @RequestMapping(method = RequestMethod.GET )
    public ResponseEntity<User> getUser(@RequestParam("login") String login){
        User foundUser = userRepository.getUser(login);
        if(foundUser!=null){
            return new ResponseEntity<User>(foundUser, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET )
    public ResponseEntity<User> login(@RequestParam("login") String login, @RequestParam("password") String password){
        User foundUser = userRepository.login(login,password);
        if(foundUser!=null){
            return new ResponseEntity<User>(foundUser, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/update/points", method = RequestMethod.GET)
    public ResponseEntity<User> updatePoints(@RequestParam("login") String login, @RequestParam("points") Integer points){
        return updateUserState(login, points, "points");
    }

    @RequestMapping(value = "/update/stamps", method = RequestMethod.GET)
    public ResponseEntity<User> updateStamps(@RequestParam("login") String login, @RequestParam("stamps") Integer stamps){
        return updateUserState(login, stamps, "stamps");
    }

    private ResponseEntity<User> updateUserState(String login, Integer state, String stateName){
        User foundUser = userRepository.updateState(login,state,stateName);
        if(foundUser!=null){
            return new ResponseEntity<User>(foundUser, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST )
    public ResponseEntity<User> register(@RequestBody User user){
        User registeredUser = userRepository.register(user);
        if(registeredUser !=null){
            return new ResponseEntity<User>(registeredUser , HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }

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