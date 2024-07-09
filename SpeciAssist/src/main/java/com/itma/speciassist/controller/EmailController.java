package com.itma.speciassist.controller;

import java.util.HashMap;
import java.util.Map;

// Importing required classes

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itma.speciassist.model.Email;
import com.itma.speciassist.service.EmailService;

// Annotation

@RequestMapping("/email")
@RestController
public class EmailController {

    @Autowired 
    private EmailService emailService;

    // Sending a simple Email
    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> sendMail(@RequestBody Email email) {
        String status = emailService.sendSimpleMail(email);
        Map<String, String> response = new HashMap<>();
        response.put("status", status);
        return ResponseEntity.ok(response);
    }

    // Sending email with attachment
    @PostMapping("/sendMailWithAttachment")
    public ResponseEntity<Map<String, String>> sendMailWithAttachment(@RequestBody Email details) {
        String status = emailService.sendMailWithAttachment(details);
        Map<String, String> response = new HashMap<>();
        response.put("status", status);
        return ResponseEntity.ok(response);
    }
}
