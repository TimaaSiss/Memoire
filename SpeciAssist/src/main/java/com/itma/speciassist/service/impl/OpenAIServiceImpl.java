package com.itma.speciassist.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.itma.speciassist.model.ReponseOpenAI;
import com.itma.speciassist.model.User;
import com.itma.speciassist.repository.ReponseOpenAIRepository;
import com.itma.speciassist.repository.UserRepository;
import com.itma.speciassist.service.OpenAIService;

import jakarta.annotation.PostConstruct;

@Service
public class OpenAIServiceImpl implements OpenAIService {

    private final RestTemplate restTemplate;
    private final ReponseOpenAIRepository reponseOpenAIRepository;
    private final UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(OpenAIServiceImpl.class);

    @Value("${openai.api.key}")
    private String openaiApiKey;

    @Autowired
    public OpenAIServiceImpl(RestTemplate restTemplate, ReponseOpenAIRepository reponseOpenAIRepository, UserRepository userRepository) {
        this.restTemplate = restTemplate;
        this.reponseOpenAIRepository = reponseOpenAIRepository;
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void init() {
        // Log API Key to verify
        logger.info("Using OpenAI API Key in PostConstruct: {}", openaiApiKey);  // REMOVE in production
    }

    @Override
    public User findUserById(Integer userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
   public String callOpenAI(String userInput) {
    String apiUrl = "https://api.aimlapi.com/chat/completions";
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.setBearerAuth(openaiApiKey);

    Map<String, Object> requestBody = new HashMap<>();
    requestBody.put("model", "mistralai/Mistral-7B-Instruct-v0.2");
    requestBody.put("messages", List.of(Map.of("role", "user", "content", userInput)));
    requestBody.put("max_tokens", 150);

    HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

    try {
        logger.info("Sending request to AIML API");
        ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);
        logger.info("Received response from AIML API: {}", response.getStatusCode());

        if (response.getStatusCode() == HttpStatus.OK || response.getStatusCode() == HttpStatus.CREATED) {
            logger.debug("Response body: {}", response.getBody());
            return response.getBody();
        } else {
            throw new RuntimeException("Failed to call AIML API: " + response.getStatusCode());
        }
    } catch (HttpClientErrorException e) {
        logger.error("HttpClientErrorException occurred: {}", e.getMessage());
        if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS) {
           // retryAfterDelay(60000); // Wait for 60 seconds before retrying
            return callOpenAI(userInput); // Retry the call after the delay
        } else {
            throw new RuntimeException("Failed to call AIML API: " + e.getMessage(), e);
        }
    } catch (Exception e) {
        logger.error("Exception occurred: {}", e.getMessage());
        throw new RuntimeException("Failed to call AIML API: " + e.getMessage(), e);
    }
}
    
    private String parseApiResponse(String apiResponse) {
        try {
            // Convertir la réponse en objet JSON
            JSONObject jsonResponse = new JSONObject(apiResponse);

            // Vérifier si la clé "choices" existe dans la réponse
            if (jsonResponse.has("choices")) {
                // Récupérer le tableau d'objets "choices"
                JSONArray choices = jsonResponse.getJSONArray("choices");

                // Parcourir chaque objet dans le tableau "choices"
                for (int i = 0; i < choices.length(); i++) {
                    JSONObject choice = choices.getJSONObject(i);

                    // Vérifier si chaque objet a la clé "message"
                    if (choice.has("message")) {
                        // Récupérer l'objet "message"
                        JSONObject message = choice.getJSONObject("message");

                        // Vérifier si l'objet "message" a la clé "content"
                        if (message.has("content")) {
                            // Retourner le contenu du message
                            return message.getString("content");
                        }
                    }
                }
            }
        } catch (JSONException e) {
            // Gérer les erreurs de parsing JSON
            logger.error("Error parsing API response: {}", e.getMessage());
        }

        return "";
    }
      
   
    

    @Override
    public ReponseOpenAI generateAndSaveResponse(Integer userId, String responseText) {
        logger.info("Generating and saving response for userId: {}", userId);

        // Récupérer l'utilisateur à partir de son ID
        User user = findUserById(userId);

        String apiResponse = callOpenAI(responseText);

        // Analyser la réponse de l'API pour extraire le contenu
        String content = parseApiResponse(apiResponse);

        // Générer une réponse concise pour l'utilisateur
        String userResponse = content.isEmpty() ? "Aucune carrière suggérée." : content;

        // Enregistrer la réponse dans la base de données
        ReponseOpenAI reponseOpenAI = new ReponseOpenAI();
        reponseOpenAI.setUser(user);  // Définir l'utilisateur en utilisant l'objet User
        reponseOpenAI.setReponseAPI(userResponse);
        ReponseOpenAI savedResponse = reponseOpenAIRepository.save(reponseOpenAI);

        logger.info("Saved response for userId: {}", userId);
        return savedResponse;
    }


}
