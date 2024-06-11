package com.itma.speciassist.service;

import java.util.List;

import com.itma.speciassist.model.ReponseOpenAI;
import com.itma.speciassist.model.User;

public interface OpenAIService {
    User findUserById(Integer userId);
    String callOpenAI(String userInput);
  //  ReponseOpenAI generateAndSaveResponse(User user, String userInput);
	//ReponseOpenAI generateAndSaveResponse(User user, List<ReponseUser> reponsesUser);
	//ReponseOpenAI generateAndSaveResponse(User userId, String responseText);
	ReponseOpenAI generateAndSaveResponse(Integer userId, String responseText);
	List<ReponseOpenAI> findAllReponsesByUserId(Integer userId);
}
