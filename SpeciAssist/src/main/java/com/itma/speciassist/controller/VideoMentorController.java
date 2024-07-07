package com.itma.speciassist.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.itma.speciassist.exception.StorageProperties;
import com.itma.speciassist.model.VideoMentor;
import com.itma.speciassist.service.VideoMentorService;

@RestController
@RequestMapping("/mentor-videos")
public class VideoMentorController {

    @Autowired
    private VideoMentorService videoMentorService;

    @GetMapping("/carriere/{carriereId}")
    public List<VideoMentor> getVideosByCarriereId(@PathVariable Long carriereId) {
        return videoMentorService.getVideosByCarriereId(carriereId);
    }

    @GetMapping("/mentor/{mentorId}")
    public List<VideoMentor> getVideosByMentorId(@PathVariable Long mentorId) {
        return videoMentorService.getVideosByMentorId(mentorId);
    }

    @PostMapping("/upload")
    public ResponseEntity<VideoMentor> handleFileUpload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("mentorId") Long mentorId,
            @RequestParam("carriereId") Long carriereId,
            @RequestParam("title") String title,
            @RequestParam("userId") Long userId) { // Ajoutez ce paramètre

        Optional<VideoMentor> video = videoMentorService.store(file, mentorId, carriereId, title, userId); // Passez l'ID de l'utilisateur
        if (video.isPresent()) {
            return ResponseEntity.ok(video.get());
        } else {
            return ResponseEntity.status(500).body(null);
        }
    }


    @GetMapping("/videos/{fileName:.+}")
    public ResponseEntity<Resource> getVideo(@PathVariable String fileName) {
        Resource file = videoMentorService.loadAsResource(fileName);
        String mimeType = "video/mp4"; // Remplacez par le type MIME approprié si nécessaire
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"")
                .header(HttpHeaders.CONTENT_TYPE, mimeType)
                .body(file);
    }

    @PutMapping("/{id}")
    public VideoMentor updateVideo(@PathVariable Long id, @RequestBody VideoMentor videoMentor) {
        return videoMentorService.updateVideo(id, videoMentor);
    }

    @GetMapping("/video-list")
    public List<Path> listUploadedVideos() throws IOException {
    	StorageProperties properties = new StorageProperties();
        Path directoryPath = Paths.get(properties.getLocation());
        return Files.list(directoryPath).toList();
    }
    
    @DeleteMapping("/delete/{id}")
    public VideoMentor deleteVideo(@PathVariable Long id) {
        return videoMentorService.deleteVideo(id);
    }
    
}
