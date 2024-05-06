package com.itma.speciassist.service.impl;

import java.nio.CharBuffer;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.itma.speciassist.dto.CredentialsDto;
import com.itma.speciassist.dto.SignUpDto;
import com.itma.speciassist.exception.AppException;
import com.itma.speciassist.mappers.UserMapper;
import com.itma.speciassist.model.Role;
import com.itma.speciassist.model.User;
import com.itma.speciassist.repository.UserRepository;
import com.itma.speciassist.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private UserMapper userMapper;
    
    
    
    public User username(CredentialsDto credentialsDto) {
        User user = userRepository.findByUsername(credentialsDto.username())
            .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.password()), user.getPassword())) {
            // Récupérer le rôle de l'utilisateur depuis la base de données
        	Role userRole = userRepository.findRoleByUsername(credentialsDto.username());
        	
 // Vérifier si le rôle dans la demande correspond au rôle de l'utilisateur
            if (userRole != null && userRole.equals(credentialsDto.getRole())) {
                user.setRole(userRole);
                return user;
            } else {
                throw new AppException("Invalid role", HttpStatus.BAD_REQUEST);
            }
        }
    	throw new AppException("Invalid passwword", HttpStatus.BAD_REQUEST);
    				
    }
    
    public User register(SignUpDto signUpDto) {
    	Optional<User> oUser= userRepository.findByUsername(signUpDto.username());
    	
    	if(oUser.isPresent()) {
    		throw new AppException("username already exists", HttpStatus.BAD_REQUEST);
    	}
    	
    	User user= userMapper.signUpToUser(signUpDto);
    	
    	user.setPassword(passwordEncoder.encode(CharBuffer.wrap(signUpDto.password())));
    	User savedUser= userRepository.save(user);
    	return savedUser;
    }

   
   
    @Override
    
    public User addUser(User user) {
        // Encodez le mot de passe avant de sauvegarder l'utilisateur
        String encodedPassword = passwordEncoder.encode(CharBuffer.wrap(user.getPassword()));
        user.setPassword(encodedPassword);
        
        userRepository.save(user);
        return this.getUserById(user.getId());
    }

    @Override
    public List<User> allUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user id " + id));
    }

    @Override
    public void updateUser(Integer id, User user) {
        userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user id " + id));
        user.setId(id);
        userRepository.save(user);
    }

    @Override
    public void deleteUser(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user id " + id));
        userRepository.delete(user);
    }
    
    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }


   
}
