package com.Controllers;
import com.Models.Shop;
import com.Models.ShopRowMapper;
import com.Models.User;
import com.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.RequestScope;

import java.sql.SQLException;
import java.util.List;

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
    public void login(@RequestParam("login") String login, @RequestParam("password") String password){
        User user = new User(login,password);
        System.out.println(userRepository.login(user,jdbcTemplate).getLogin());
    }
}