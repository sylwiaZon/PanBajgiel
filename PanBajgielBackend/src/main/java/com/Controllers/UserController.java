package com.Controllers;
import com.Models.User;
import com.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private UserRepository userRepository;

    UserController(){
        this.userRepository = new UserRepository();
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET )
    public ResponseEntity<User> login(@RequestParam("login") String login, @RequestParam("password") String password){
        User providedUser = new User(login,password);
        User foundUser = userRepository.login(providedUser,jdbcTemplate);
        if(foundUser!=null){
            return new ResponseEntity<User>(foundUser, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }


    @RequestMapping(value = "/register", method = RequestMethod.POST )
    public ResponseEntity<User> register(@RequestBody User user){
        User registeredUser = userRepository.register(user,jdbcTemplate);
        if(registeredUser !=null){
            return new ResponseEntity<>(registeredUser , HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@RequestParam String userId) {
        boolean action = userRepository.delete(userId,jdbcTemplate);
        if(action) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
}