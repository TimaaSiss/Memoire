// src/main/java/com/itma/speciassist/controller/VideoMentorController.java
package com.itma.speciassist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.itma.speciassist.model.VideoMentor;
import com.itma.speciassist.service.VideoMentorService;

@RestController
@RequestMapping("/mentor-videos")
public class VideoMentorController {

    @Autowired
    private VideoMentorService videoMentorService;

    @GetMapping("/{carriereId}")
    public List<VideoMentor> getVideosByCarriereId(@PathVariable Long carriereId) {
        return videoMentorService.getVideosByCarriereId(carriereId);
    }

    @GetMapping("/mentor/{mentorId}")  // Ajouter cette route
    public List<VideoMentor> getVideosByMentorId(@PathVariable Long mentorId) {
        return videoMentorService.getVideosByMentorId(mentorId);
    }
    
    @GetMapping
    public List<VideoMentor> getAllVideos() {
        return videoMentorService.getAllVideos(); // Ajouter cette méthode
    }
    
    @PostMapping
    public ResponseEntity<VideoMentor> addVideo(@RequestParam Long mentorId, @RequestBody VideoMentor videoMentor) {
        VideoMentor savedVideoMentor = videoMentorService.addVideo(mentorId, videoMentor);
        return new ResponseEntity<>(savedVideoMentor, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public VideoMentor updateVideo(@PathVariable Long id, @RequestBody VideoMentor videoMentor) {
        return videoMentorService.updateVideo(id, videoMentor);
    }

    @DeleteMapping("/{id}")
    public void deleteVideo(@PathVariable Long id) {
        videoMentorService.deleteVideo(id);
    }
}
