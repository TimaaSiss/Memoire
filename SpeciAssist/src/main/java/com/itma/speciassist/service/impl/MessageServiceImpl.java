package com.itma.speciassist.service.impl;


import com.itma.speciassist.model.Message;
import com.itma.speciassist.model.Mentor;
import com.itma.speciassist.model.User;
import com.itma.speciassist.repository.MessageRepository;
import com.itma.speciassist.service.MessageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageServiceImpl(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public Message sendMessage(User sender, User receiver, String content) {
        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(content);
        message.setDateSent(new Date());
        message.setRead(false); // Par défaut non lu

        return messageRepository.save(message);
    }

    
    @Override
    public List<Message> getMessagebyUser(User user, boolean receiver) {
    	if(receiver) {
    		
    		return messageRepository.findByReceiver(user);
    	}else {
    		return messageRepository.findBySender(user);
    	}
    }

	@Override
	public Message getMessageById(Object messageId) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public void markMessagesAsRead(User user) {
        List<Message> unreadMessages = messageRepository.findByReceiverAndIsReadFalse(user);
        for (Message message : unreadMessages) {
            message.setRead(true);
            messageRepository.save(message);
        }
    }
	
	@Override
    public Long getUnreadMessagesCount(Long userId) {
        return messageRepository.countByReceiverIdAndIsReadFalse(userId);
    }
}
