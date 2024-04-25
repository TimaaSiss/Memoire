package com.itma.speciassist.service.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.itma.speciassist.model.User;
import com.itma.speciassist.repository.UserRepository;
import com.itma.speciassist.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public User addUser(User user) {
		userRepository.save(user);
		  return this
				.getUserById(user.getId());
	}

	@Override
	public List<User> allUsers() {
		
		return userRepository.findAll();
	}

	
	@Override
	public User getUserById(Integer id) {
		User user = userRepository
				.findById(id)
				.orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user"+id));
		return user;
	}

	@Override
	public void updateUser(Integer id, User user) {
		// check weather the user is in database or not
		userRepository
				.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user id"+id));
		user.setId(id);
		
		userRepository.save(user);
				
		
		
	}

	@Override
	public void deleteUser(Integer id) {
		// check weather the user is in database or not
				User user = userRepository
						.findById(id)
						.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user id"+id));
				userRepository.delete(user);
		
	}

}
