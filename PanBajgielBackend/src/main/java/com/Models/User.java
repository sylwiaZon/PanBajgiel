package com.Models;

import java.io.Serializable;

public class User implements Serializable {
    private String login;
    private String password;
    private String name;
    private Integer points;
    private Integer stamps;
    private Integer client;

    public User() {
    }

    public User(String login, String password){
        this.login = login;
        this.password = password;
    }

    public User(String login, String password, String name, Integer points, Integer stamps, Integer client){
        this.login = login;
        this.password = password;
        this.name = name;
        this.points = points;
        this.stamps = stamps;
        this.client = client;
    }

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public Integer getPoints() {
        return points;
    }

    public Integer getStamps() {
        return stamps;
    }

    public Integer getClient() {
        return client;
    }
}
