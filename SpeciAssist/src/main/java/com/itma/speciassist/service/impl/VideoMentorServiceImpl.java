package com.itma.speciassist.service.impl;

import com.itma.speciassist.exception.StorageException;
import com.itma.speciassist.exception.StorageFileNotFoundException;
import com.itma.speciassist.exception.StorageProperties;
import com.itma.speciassist.model.Carriere;
import com.itma.speciassist.model.Mentor;
import com.itma.speciassist.model.User;
import com.itma.speciassist.model.VideoMentor;
import com.itma.speciassist.repository.CarriereRepository;
import com.itma.speciassist.repository.MentorRepository;
import com.itma.speciassist.repository.UserRepository;
import com.itma.speciassist.repository.VideoMentorRepository;
import com.itma.speciassist.service.VideoMentorService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class VideoMentorServiceImpl implements VideoMentorService {

	private final Path rootLocation ;

    @Autowired
    public VideoMentorServiceImpl(StorageProperties properties) {
        if (properties.getLocation().trim().length() == 0) {
            throw new StorageException("File upload location cannot be empty.");
        }
        this.rootLocation = Paths.get(properties.getLocation());
    }

    @Autowired
    private VideoMentorRepository videoMentorRepository;
    @Autowired
    private MentorRepository mentorRepository;
    @Autowired
    private CarriereRepository carriereRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);
        } catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }
    }

    @Override
    public Path load(String fileName) {
        return rootLocation.resolve(fileName);
    }

    @Override
    public Resource loadAsResource(String fileName) {
        try {
            Path file = load(fileName);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new StorageFileNotFoundException("Could not read file: " + fileName);
            }
        } catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + fileName, e);
        }
    }


    @Override
    public List<VideoMentor> getVideosByCarriereId(Long carriereId) {
        return videoMentorRepository.findByCarriereId(carriereId);
    }

    @Override
    public List<VideoMentor> getVideosByMentorId(Long mentorId) {
        return videoMentorRepository.findByMentorId(mentorId);
    }

    @Override
    public VideoMentor updateVideo(Long id, VideoMentor videoMentor) {
        Optional<VideoMentor> existingVideoOptional = videoMentorRepository.findById(id);
        if (existingVideoOptional.isPresent()) {
            VideoMentor existingVideo = existingVideoOptional.get();
            
            // Update the fields of existingVideo with the values from videoMentor
            existingVideo.setUrl(videoMentor.getUrl());
            existingVideo.setFileName(videoMentor.getFileName());
            existingVideo.setTitle(videoMentor.getTitle());
            
            // Check if videoMentor.getMentor() is not null before accessing
            if (videoMentor.getMentor() != null) {
                // Fetch the Mentor entity that corresponds to videoMentor.getMentor().getId()
                Mentor mentor = mentorRepository.findById(videoMentor.getMentor().getId())
                                    .orElseThrow(() -> new EntityNotFoundException("Mentor not found"));

                // Set the fetched Mentor entity to existingVideo
                existingVideo.setMentor(mentor);
            } else {
                
            }
            
            // Save the updated video
            return videoMentorRepository.save(existingVideo);
        }
        return null; // Handle this case according to your application's logic
    }

    

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    @Override
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }

    @Override
    public Optional<VideoMentor> store(MultipartFile file, Long mentorId, Long carriereId, String title, Long userId) {
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file.");
            }

            // Enregistrement du fichier sur le disque
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            Path destinationFile = this.rootLocation.resolve(Paths.get(fileName)).normalize().toAbsolutePath();
            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                throw new StorageException("Cannot store file outside current directory.");
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            }

            // Génération de l'URL de la vidéo
            String videoUrl = generateVideoUrl(fileName);

            // Enregistrement des détails du fichier dans la base de données
            Optional<Mentor> mentorOpt = mentorRepository.findById(mentorId);
            Optional<Carriere> carriereOpt = carriereRepository.findById(carriereId);
            Optional<User> userOpt = userRepository.findById(userId);

            if (mentorOpt.isPresent() && carriereOpt.isPresent()) {
                VideoMentor videoMentor = new VideoMentor();
                videoMentor.setFileName(fileName);
                videoMentor.setTitle(title);
                videoMentor.setUrl(videoUrl);  // Définir l'URL de la vidéo
                videoMentor.setMentor(mentorOpt.get());
                videoMentor.setCarriere(carriereOpt.get());
                videoMentor.setUser(userOpt.get());  // Définir l'ID de l'utilisateur
                videoMentorRepository.save(videoMentor);
                return Optional.of(videoMentor);
            } else {
                if (!mentorOpt.isPresent()) {
                    System.out.println("Mentor not found for ID: " + mentorId);
                }
                if (!carriereOpt.isPresent()) {
                    System.out.println("Carriere not found for ID: " + carriereId);
                }
                throw new EntityNotFoundException("Mentor or Carriere not found.");
            }
        } catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
    }


    private String generateVideoUrl(String fileName) {
        // Remplacez "http://yourdomain.com/videos/" par votre domaine et chemin d'accès corrects
        return "http://localhost:8080/mentor-videos/videos/" + fileName;
    }
    
    @Override
    public VideoMentor deleteVideo(Long id) {
        Optional<VideoMentor> videoMentorOptional = videoMentorRepository.findById(id);
        if (videoMentorOptional.isPresent()) {
            VideoMentor videoMentor = videoMentorOptional.get();
            videoMentorRepository.delete(videoMentor);
            return videoMentor;
        } else {
            throw new RuntimeException("Vidéo non trouvée avec l'ID : " + id);
        }
    }

	
	
}