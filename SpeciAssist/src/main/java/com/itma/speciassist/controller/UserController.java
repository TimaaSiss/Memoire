package com.itma.speciassist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.itma.speciassist.model.User;
import com.itma.speciassist.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userservice;
    
    @PostMapping("/addUser")
    public User addUser(@RequestBody User user) {
        return userservice.addUser(user);
    } 
    

    @GetMapping("/allUsers")
    public List<User> getAllUsers() {
        return userservice.allUsers();
   }

   @GetMapping("/get/{id}")
      public User getUserById(@RequestParam Integer id) {
        return userservice.getUserById(id);
        }

    

   @PutMapping("/update/{id}")
    public ResponseEntity<Void> updateUser(@PathVariable Integer id, @RequestBody User user) {
       userservice.updateUser(id, user);
   
      return ResponseEntity.noContent().build();
      }
   
   @DeleteMapping("/delete/{id}")
   public ResponseEntity<Void>deleteUser(@PathVariable Integer id){
	   userservice.deleteUser(id);
	   
	   return ResponseEntity.noContent().build();
   }
   
   

}