package com.itma.speciassist.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.itma.speciassist.model.ReponseOpenAI;
import com.itma.speciassist.model.User;
import com.itma.speciassist.repository.ReponseOpenAIRepository;
import com.itma.speciassist.repository.UserRepository;
import com.itma.speciassist.service.OpenAIService;

@Service
public class OpenAIServiceImpl implements OpenAIService {

	 private final RestTemplate restTemplate;
	    private final ReponseOpenAIRepository reponseOpenAIRepository;
	    private final UserRepository userRepository;

	    @Autowired
	    public OpenAIServiceImpl(RestTemplate restTemplate, ReponseOpenAIRepository reponseOpenAIRepository, UserRepository userRepository) {
	        this.restTemplate = restTemplate;
	        this.reponseOpenAIRepository = reponseOpenAIRepository;
	        this.userRepository = userRepository;
	    }

	    @Override
	    public User findUserById(Integer userId) {
	        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
	    }

	    @Override
	    public String callOpenAI(String userInput) {
	        String apiUrl = "https://api.openai.com/v1/chat/completions"; // Remplacez par l'URL correcte de l'API
	        HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.APPLICATION_JSON);
	        headers.setBearerAuth("your_api_key"); // Remplacez par votre clé API

	        // Créez le corps de la requête
	        Map<String, Object> requestBody = new HashMap<>();
	        requestBody.put("prompt", userInput);
	        requestBody.put("max_tokens", 150); // Ajustez selon vos besoins

	        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

	        ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);
	        if (response.getStatusCode() == HttpStatus.OK) {
	            return response.getBody();
	        } else {
	            throw new RuntimeException("Failed to call OpenAI API");
	        }
	    }

	    @Override
	    public ReponseOpenAI generateAndSaveResponse(Integer userId, String responseText) {
	        String apiResponse = callOpenAI(responseText);

	        ReponseOpenAI reponseOpenAI = new ReponseOpenAI();
	        reponseOpenAI.setUser(userId);
	        reponseOpenAI.setReponseAPI(apiResponse);

	        return reponseOpenAIRepository.save(reponseOpenAI);
	    }

		/*
		 * @Override public ReponseOpenAI generateAndSaveResponse(User user,
		 * List<ReponseUser> reponsesUser) { // TODO Auto-generated method stub return
		 * null; }
		 */
		
	
}
