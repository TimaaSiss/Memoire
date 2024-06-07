package com.itma.speciassist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.itma.speciassist.model.ReponseOpenAI;
import com.itma.speciassist.service.OpenAIService;
import com.itma.speciassist.service.ResponseTextBuilderService;

@RestController
@RequestMapping("/api/openai")
public class OpenAIController {

    private final OpenAIService openAIService;
    private final ResponseTextBuilderService responseTextBuilderService;

    @Autowired
    public OpenAIController(OpenAIService openAIService, ResponseTextBuilderService responseTextBuilderService) {
        this.openAIService = openAIService;
        this.responseTextBuilderService = responseTextBuilderService;
    }

    @PostMapping("/generate")
    public ResponseEntity<ReponseOpenAI> generateReponse(@RequestParam Integer userId) {
        String responseText = responseTextBuilderService.buildResponseText(userId);
        ReponseOpenAI reponse = openAIService.generateAndSaveResponse(userId, responseText);
        return ResponseEntity.ok(reponse);
    }
}
