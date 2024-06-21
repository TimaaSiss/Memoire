package com.itma.speciassist.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.itma.speciassist.model.VideoMentor;

public interface VideoMentorService {
    List<VideoMentor> getVideosByCarriereId(Long carriereId);
    List<VideoMentor> getAllVideos();
    VideoMentor updateVideo(Long id, VideoMentor videoMentor);
    void deleteVideo(Long id);
	List<VideoMentor> getVideosByMentorId(Long mentorId);
	  VideoMentor addVideo(Long mentorId, VideoMentor videoMentor, MultipartFile file);
	//VideoMentor addVideo(Long mentorId, VideoMentor videoMentor);
}