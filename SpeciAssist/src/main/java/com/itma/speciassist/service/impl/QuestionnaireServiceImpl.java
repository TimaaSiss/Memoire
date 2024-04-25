package com.itma.speciassist.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itma.speciassist.model.Questionnaire;
import com.itma.speciassist.repository.QuestionnaireRepository;
import com.itma.speciassist.service.QuestionnaireService;

@Service
public class QuestionnaireServiceImpl implements QuestionnaireService {

    @Autowired
    private QuestionnaireRepository questionnaireRepository;

    @Override
    public List<Questionnaire> getAllQuestionnaires() {
        return questionnaireRepository.findAll();
    }

    @Override
    public Questionnaire addQuestionnaire(Questionnaire questionnaire) {
        return questionnaireRepository.save(questionnaire);
    }

    @Override
    public Questionnaire getQuestionnaireById(Long id) {
        return questionnaireRepository.findById(id).orElse(null);
    }

    @Override
    public Questionnaire updateQuestionnaire(Long id, Questionnaire questionnaire) {
        if (questionnaireRepository.existsById(id)) {
            questionnaire.setId(id);
            return questionnaireRepository.save(questionnaire);
        } else {
            return null;
        }
    }

    @Override
    public void deleteQuestionnaire(Long id) {
        questionnaireRepository.deleteById(id);
    }

    @Override
    public Questionnaire saveQuestionnaire(Questionnaire questionnaire) {
        return questionnaireRepository.save(questionnaire);
    }
}
