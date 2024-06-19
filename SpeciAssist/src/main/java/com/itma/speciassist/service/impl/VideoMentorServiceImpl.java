
package com.itma.speciassist.service.impl;

import com.itma.speciassist.model.Carriere;
import com.itma.speciassist.model.Mentor;
import com.itma.speciassist.model.VideoMentor;
import com.itma.speciassist.repository.CarriereRepository;
import com.itma.speciassist.repository.MentorRepository;
import com.itma.speciassist.repository.VideoMentorRepository;
import com.itma.speciassist.service.VideoMentorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class VideoMentorServiceImpl implements VideoMentorService {

    @Autowired
    private VideoMentorRepository videoMentorRepository;
    @Autowired
    private MentorRepository mentorRepository;
    @Autowired
    private CarriereRepository carriereRepository;

    @Override
    public List<VideoMentor> getAllVideos() {
        return videoMentorRepository.findAll(); // Ajouter cette ligne
    }
    
    @Override
    public List<VideoMentor> getVideosByCarriereId(Long carriereId) {
        return videoMentorRepository.findByCarriereId(carriereId);
    }
    
    @Override
    public List<VideoMentor> getVideosByMentorId(Long mentorId) {  // Implémenter cette méthode
        return videoMentorRepository.findByMentorId(mentorId);
    }
    
    @Override
    public VideoMentor addVideo(Long mentorId, VideoMentor videoMentor) {
        Mentor mentor = mentorRepository.findById(mentorId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Mentor not found"));

        videoMentor.setMentor(mentor);

        // Rechercher une carrière correspondante au titre de la vidéo
        List<Carriere> carrieres = carriereRepository.findAll();
        Carriere matchedCarriere = null;
        for (Carriere carriere : carrieres) {
            if (videoMentor.getTitle().toLowerCase().contains(carriere.getNom().toLowerCase())) {
                matchedCarriere = carriere;
                break;
            }
        }

        // Si aucune carrière correspondante n'est trouvée, définir carriere comme null
        videoMentor.setCarriere(matchedCarriere);

        return videoMentorRepository.save(videoMentor);
    }
    @Override
    public VideoMentor updateVideo(Long id, VideoMentor videoMentor) {
        Optional<VideoMentor> existingVideoOptional = videoMentorRepository.findById(id);
        if (existingVideoOptional.isPresent()) {
            videoMentor.setId(id);
            return videoMentorRepository.save(videoMentor);
        }
        return null;
    }

    @Override
    public void deleteVideo(Long id) {
        videoMentorRepository.deleteById(id);
    }
}
