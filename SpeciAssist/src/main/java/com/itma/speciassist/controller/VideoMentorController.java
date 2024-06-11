// src/main/java/com/itma/speciassist/controller/VideoMentorController.java
package com.itma.speciassist.controller;

import com.itma.speciassist.model.VideoMentor;
import com.itma.speciassist.service.VideoMentorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mentor-videos")
public class VideoMentorController {

    @Autowired
    private VideoMentorService videoMentorService;

    @GetMapping("/byCareer/{carriereId}")
    public List<VideoMentor> getVideosByCarriereId(@PathVariable Long carriereId) {
        return videoMentorService.getVideosByCarriereId(carriereId);
    }

    @PostMapping
    public VideoMentor addVideo(@RequestBody VideoMentor videoMentor) {
        return videoMentorService.addVideo(videoMentor);
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
