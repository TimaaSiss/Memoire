package com.itma.speciassist.controller;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.itma.speciassist.model.VideoMentor;
import com.itma.speciassist.service.VideoMentorService;

@RestController
@RequestMapping("/mentor-videos")
public class VideoMentorController {

    private static final String VIDEO_DIRECTORY = "C:\\Users\\HP\\Downloads\\MediaHuman\\Video"; // Update this path
    private static final Logger logger = LoggerFactory.getLogger(VideoMentorController.class);

    @Autowired
    private VideoMentorService videoMentorService;

    @GetMapping("/{carriereId}")
    public List<VideoMentor> getVideosByCarriereId(@PathVariable Long carriereId) {
        return videoMentorService.getVideosByCarriereId(carriereId);
    }

    @GetMapping("/mentor/{mentorId}")
    public List<VideoMentor> getVideosByMentorId(@PathVariable Long mentorId) {
        return videoMentorService.getVideosByMentorId(mentorId);
    }

    @GetMapping
    public List<VideoMentor> getAllVideos() {
        return videoMentorService.getAllVideos();
    }

    @PostMapping("/upload/{mentorId}")
    public ResponseEntity<VideoMentor> uploadVideo(@PathVariable Long mentorId,
                                                   @RequestParam("file") MultipartFile file,
                                                   @RequestParam("title") String title) throws IOException {
        logger.info("Début de l'upload de la vidéo pour le mentor ID: " + mentorId);

        if (file.isEmpty()) {
            logger.error("Aucun fichier sélectionné pour l'upload");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Aucun fichier sélectionné pour l'upload.");
        }

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Path targetLocation = Paths.get(VIDEO_DIRECTORY).resolve(fileName);

        // Renommer le fichier s'il existe déjà
        int counter = 1;
        String newFileName = fileName;
        while (Files.exists(targetLocation)) {
            String name = fileName.substring(0, fileName.lastIndexOf('.'));
            String extension = fileName.substring(fileName.lastIndexOf('.'));
            newFileName = name + "_" + counter + extension;
            targetLocation = Paths.get(VIDEO_DIRECTORY).resolve(newFileName);
            counter++;
        }

        logger.info("Copie du fichier vers le répertoire cible: " + targetLocation);
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, targetLocation);
        } catch (IOException e) {
            logger.error("Erreur lors de la copie du fichier", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erreur lors de la copie du fichier", e);
        }

        VideoMentor videoMentor = new VideoMentor();
        videoMentor.setTitle(title);
        videoMentor.setFileName(newFileName);

        try {
            logger.info("Enregistrement de la vidéo dans la base de données");
            VideoMentor savedVideoMentor = videoMentorService.addVideo(mentorId, videoMentor, file);
            logger.info("Vidéo enregistrée avec succès: " + savedVideoMentor.getId());
            return new ResponseEntity<>(savedVideoMentor, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Erreur lors de l'enregistrement de la vidéo", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erreur lors de l'enregistrement de la vidéo", e);
        }
    }

    @GetMapping("/videos/{fileName:.+}")
    public ResponseEntity<Resource> getVideo(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(VIDEO_DIRECTORY).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Fichier non trouvé");
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erreur lors de la récupération du fichier", e);
        }
    }

    @PutMapping("/{id}")
    public VideoMentor updateVideo(@PathVariable Long id, @RequestBody VideoMentor videoMentor) {
        return videoMentorService.updateVideo(id, videoMentor);
    }

    @DeleteMapping("/{id}")
    public void deleteVideo(@PathVariable Long id) {
        videoMentorService.deleteVideo(id);
        // Supprimer le fichier vidéo correspondant
        Path targetLocation = Paths.get(VIDEO_DIRECTORY).resolve(id.toString() + ".mp4");
        try {
            Files.deleteIfExists(targetLocation);
        } catch (IOException e) {
            logger.error("Erreur lors de la suppression du fichier vidéo", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erreur lors de la suppression du fichier vidéo", e);
        }
    }
}
