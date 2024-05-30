package com.itma.speciassist.service.impl;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.itma.speciassist.model.ReponseUser;
import com.itma.speciassist.repository.ReponseUserRepository;
import com.itma.speciassist.service.ReponseUserService;

@Service
public class ReponseUserServiceImpl implements ReponseUserService {

    @Autowired
    private ReponseUserRepository reponseRepository;

    private static final List<String> STOP_WORDS = Arrays.asList(
            "le", "la", "les", "de", "du", "des", "et", "ou", "mais"
            // Ajoutez d'autres mots vides au besoin
    );

    @Override
    public ReponseUser addReponse(ReponseUser reponse) {
        // Prétraiter les réponses textuelles
        if (reponse.getReponseTextuelle() != null) {
            String preprocessedText = preprocessText(reponse.getReponseTextuelle());
            reponse.setReponseTextuelle(preprocessedText);
        }

        // Prétraiter les réponses choisies
        if (reponse.getReponseChoisie() != null) {
            String preprocessedChoice = preprocessText(reponse.getReponseChoisie());
            reponse.setReponseChoisie(preprocessedChoice);
        }

        return reponseRepository.save(reponse);
    }

    @Override
    public List<ReponseUser> getAllReponses() {
        return reponseRepository.findAll();
    }

    @Override
    public ReponseUser getReponseById(Integer id) {
        return reponseRepository.findById(id).orElse(null);
    }

    @Override
    public List<ReponseUser> getReponsesByUserId(Integer userId) {
        return reponseRepository.findByUserId(userId);
    }

    @Override
    public List<ReponseUser> getReponsesByQuestionId(Integer questionId) {
        return reponseRepository.findByQuestionId(questionId);
    }

    @Override
    public ReponseUser updateReponse(Integer id, ReponseUser reponse) {
        if (!reponseRepository.existsById(id)) {
            return null;
        }
        reponse.setId(id);
        return reponseRepository.save(reponse);
    }

    @Override
    public void deleteReponse(Integer id) {
        reponseRepository.deleteById(id);
    }

    public String preprocessText(String text) {
        // Nettoyage du texte : suppression de la ponctuation et mise en minuscules
        text = text.replaceAll("[^a-zA-Z0-9\\s]", "").toLowerCase();
        // Suppression des mots vides
        text = removeStopWords(text);
        return text;
    }

    private String removeStopWords(String text) {
        // Suppression des mots vides de la liste
        for (String stopWord : STOP_WORDS) {
            text = text.replaceAll("\\b" + stopWord + "\\b", "");
        }
        return text.trim(); // Supprimez les espaces supplémentaires avant et après le texte
    }

    public List<ReponseUser> preprocessReponses(List<ReponseUser> reponses) {
        for (ReponseUser reponse : reponses) {
            if (reponse.getReponseTextuelle() != null) {
                String preprocessedText = preprocessText(reponse.getReponseTextuelle());
                reponse.setReponseTextuelle(preprocessedText);
            }
            if (reponse.getReponseChoisie() != null) {
                String preprocessedChoice = preprocessText(reponse.getReponseChoisie());
                reponse.setReponseChoisie(preprocessedChoice);
            }
        }
        return reponses;
    }
}
