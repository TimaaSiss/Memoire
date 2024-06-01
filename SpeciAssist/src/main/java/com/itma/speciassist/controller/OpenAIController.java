package com.itma.speciassist.controller;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.itma.speciassist.model.ReponseOpenAI;
import com.itma.speciassist.model.ReponseUser;
import com.itma.speciassist.model.User;
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
	    public ReponseOpenAI generateReponse(@RequestParam Integer userId, @RequestBody List<ReponseUser> reponsesUser) {
	        String responseText = responseTextBuilderService.buildResponseText(reponsesUser);
	        return openAIService.generateAndSaveResponse(userId, responseText);
	    }
}
