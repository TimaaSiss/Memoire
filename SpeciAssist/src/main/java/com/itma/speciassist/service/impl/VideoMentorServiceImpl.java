// src/main/java/com/itma/speciassist/service/impl/VideoMentorServiceImpl.java
package com.itma.speciassist.service.impl;

import com.itma.speciassist.model.VideoMentor;
import com.itma.speciassist.repository.VideoMentorRepository;
import com.itma.speciassist.service.VideoMentorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VideoMentorServiceImpl implements VideoMentorService {

    @Autowired
    private VideoMentorRepository videoMentorRepository;

    @Override
    public List<VideoMentor> getVideosByCarriereId(Long carriereId) {
        return videoMentorRepository.findByCarriereId(carriereId);
    }

    @Override
    public VideoMentor addVideo(VideoMentor videoMentor) {
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
