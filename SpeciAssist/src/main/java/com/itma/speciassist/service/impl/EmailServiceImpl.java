package com.itma.speciassist.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.itma.speciassist.model.Email;
import com.itma.speciassist.service.EmailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String receiver;

    @Override
    public String sendSimpleMail(Email details) {
        try {
            if (details.getRecipient() == null || details.getRecipient().isEmpty()) {
                return "Recipient email address is missing.";
            }
            if (details.getSubject() == null || details.getSubject().isEmpty()) {
                return "Email subject is missing.";
            }
            if (details.getMsgBody() == null || details.getMsgBody().isEmpty()) {
                return "Email message body is missing.";
            }

            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(receiver);  // L'email de l'admin comme destinataire
            mailMessage.setFrom(details.getRecipient());  // L'email de l'utilisateur comme expéditeur
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());

            javaMailSender.send(mailMessage);
            return "Mail Sent Successfully...";
        } catch (Exception e) {
            e.printStackTrace();  // Print the stack trace for debugging
            return "Error while Sending Mail: " + e.getMessage();
        }
    }

    @Override
    public String sendMailWithAttachment(Email details) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(details.getRecipient());  // L'email de l'utilisateur comme expéditeur
            mimeMessageHelper.setTo(receiver);  // L'email de l'admin comme destinataire
            mimeMessageHelper.setText(details.getMsgBody());
            mimeMessageHelper.setSubject(details.getSubject());
            // FileSystemResource file = new FileSystemResource(new File(details.getAttachment()));
            // mimeMessageHelper.addAttachment(file.getFilename(), file);
            javaMailSender.send(mimeMessage);
            return "Mail sent Successfully";
        } catch (MessagingException e) {
            e.printStackTrace();  // Print the stack trace for debugging
            return "Error while sending mail: " + e.getMessage();
        }
    }
}
