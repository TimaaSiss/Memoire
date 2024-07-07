package com.itma.speciassist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itma.speciassist.model.Mentor;
import com.itma.speciassist.model.Message;
import com.itma.speciassist.model.User;
import com.itma.speciassist.service.MentorService;
import com.itma.speciassist.service.MessageService;
import com.itma.speciassist.service.UserService;

@RestController
@RequestMapping("/messages")
public class MessageController {

    private final MessageService messageService;
    private final UserService userService;

    @Autowired
    public MessageController(MessageService messageService, UserService userService) {
        this.messageService = messageService;
        this.userService = userService;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody MessageRequest messageRequest) {
        try {
            // Log the incoming request details
        	 System.out.println("Received message request: " + 
        	            "sender=" + messageRequest.getSenderId() +
        	            ", reveiver=" + messageRequest.getReceiverId() +
        	            ", content=" + messageRequest.getContent());

            // Retrieve sender and receiver
            User sender = userService.getUserById(messageRequest.getSenderId());
            System.out.println(sender);
            if (sender == null) {
                return ResponseEntity.badRequest().body("Sender with id " + messageRequest.getSenderId() + " not found");
            }

            User receiver = userService.getUserById(messageRequest.getReceiverId());
            if (receiver == null) {
                return ResponseEntity.badRequest().body("Receiver with id " + messageRequest.getReceiverId() + " not found");
            }

            // Create message content
            String content = messageRequest.getContent();

            // Send message
            Message sentMessage = messageService.sendMessage(sender, receiver, content);

            return ResponseEntity.ok(sentMessage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }
    
    @PostMapping("/reply")
    public ResponseEntity<?> replyMessage(@RequestBody ReplyRequest replyRequest) {
        try {
            User sender = userService.getUserById(replyRequest.getSenderId());
            if (sender == null) {
                return ResponseEntity.badRequest().body("Sender not found");
            }
            
            Message originalMessage = messageService.getMessageById(replyRequest.getMessageId());
            if (originalMessage == null) {
                return ResponseEntity.badRequest().body("Original message not found");
            }

            User receiver = originalMessage.getSender(); // Assuming the reply is sent to the original sender

            String replyContent = replyRequest.getContent();

            Message replyMessage = messageService.sendMessage(sender, receiver, replyContent);

            return ResponseEntity.ok(replyMessage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }




    @GetMapping("/receiver/{userId}")
    public List<Message> getMessagebyreceiver(@PathVariable Integer userId) {
        User user = this.userService.getUserById(userId);
        return messageService.getMessagebyUser(user, true);
    }
    
    @GetMapping("/sender/{userId}")
    public List<Message> getMessagesbysender(@PathVariable Integer userId) {
        User user = this.userService.getUserById(userId);
        return messageService.getMessagebyUser(user, false);
    }

    // Ajoutez d'autres méthodes de contrôleur REST selon vos besoins
}
