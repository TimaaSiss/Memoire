package com.itma.speciassist.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.itma.speciassist.model.User;

public interface UserService {
    User addUser(User user);

    List<User> allUsers();

    User getUserById(Integer id);

    void updateUser(Integer id, User user);

    void deleteUser(Integer id);

	User getUserById(Long id);

	void activateUser(Long userId);

	void deactivateUser(Long userId);

	
	 Page<User> allUsers(Pageable pageable);

	boolean usernameExists(String username);

	long getUserCount();


    }
