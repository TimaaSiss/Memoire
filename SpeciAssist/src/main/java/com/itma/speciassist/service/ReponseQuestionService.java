package com.itma.speciassist.service;

import com.itma.speciassist.model.ReponseQuestion;

public interface ReponseQuestionService {
   ReponseQuestion getReponseById(String id);
    ReponseQuestion addReponse(ReponseQuestion reponse);
   // ReponseQuestion updateReponse(Long id, ReponseQuestion reponse);
    
	//void deleteReponse(Long id);
	ReponseQuestion updateReponse(String id, ReponseQuestion reponse);
	void deleteReponse(String id);
	
	
	
}
