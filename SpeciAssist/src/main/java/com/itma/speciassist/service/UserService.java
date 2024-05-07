package com.itma.speciassist.service;

import java.util.List;

import com.itma.speciassist.model.User;

public interface UserService {
    User addUser(User user);

    List<User> allUsers();

    User getUserById(Integer id);

    void updateUser(Integer id, User user);

    void deleteUser(Integer id);

	User getUserById(Long id);



    }
