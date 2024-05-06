package com.itma.speciassist.controller;

import java.net.URI;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.itma.speciassist.config.UserAuthProvider;
import com.itma.speciassist.dto.CredentialsDto;
import com.itma.speciassist.dto.SignUpDto;
import com.itma.speciassist.model.User;
import com.itma.speciassist.service.impl.UserServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AuthController {
    
	@Autowired
    private final UserServiceImpl userServiceImpl;
    private final UserAuthProvider userAuthProvider;
    
    @PostMapping("/username")
    public ResponseEntity<User> login(@RequestBody CredentialsDto credentialsDto){
        User user = userServiceImpl.username(credentialsDto);
        user.setToken(userAuthProvider.createToken(user)); // Utilisez l'instance de UserAuthProvider ici
        return ResponseEntity.ok(user);
    }
    
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody SignUpDto signUpDto){
        User user = userServiceImpl.register(signUpDto);
        user.setToken(userAuthProvider.createToken(user)); // Utilisez l'instance de UserAuthProvider ici
        return ResponseEntity.created(URI.create("/users/" + user.getId())).body(user);
    }
}
