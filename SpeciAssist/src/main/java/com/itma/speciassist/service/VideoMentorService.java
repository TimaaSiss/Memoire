package com.itma.speciassist.service;

import java.nio.file.Path;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import com.itma.speciassist.model.User;
import com.itma.speciassist.model.VideoMentor;

public interface VideoMentorService {
    List<VideoMentor> getVideosByCarriereId(Long carriereId);
    VideoMentor updateVideo(Long id, VideoMentor videoMentor);
    List<VideoMentor> getVideosByMentorId(Long mentorId);
    Resource loadAsResource(String fileName);
    Stream<Path> loadAll();
   // Optional<VideoMentor> store(MultipartFile file, Long mentorId, Long carriereId, String title);
    Path load(String fileName);
    void deleteAll();
    void init();
	VideoMentor deleteVideo(Long id);
	//Optional<VideoMentor> store(MultipartFile file, Long mentorId, Long carriereId, String title, Long userId);
	//Optional<VideoMentor> store(MultipartFile file, Long mentorId, Long carriereId, String title, User userId);
	Optional<VideoMentor> store(MultipartFile file, Long mentorId, Long carriereId, String title, Long userId);
}
