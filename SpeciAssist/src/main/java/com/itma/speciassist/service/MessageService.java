package com.itma.speciassist.service;

import java.util.List;

import com.itma.speciassist.model.Mentor;
import com.itma.speciassist.model.Message;
import com.itma.speciassist.model.User;

public interface MessageService {
	Message sendMessage(User sender, User receiver, String content);
	List<Message> getMessagebyUser(User user, boolean receiver);
	Message getMessageById(Object messageId);
}
