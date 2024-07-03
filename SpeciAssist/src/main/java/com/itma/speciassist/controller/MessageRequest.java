package com.itma.speciassist.controller;

import java.util.Date;

import com.itma.speciassist.model.Mentor;
import com.itma.speciassist.model.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageRequest {

	private Integer senderId;
	private Integer receiverId;
	private String content;

}
