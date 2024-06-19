package com.itma.speciassist.service;

import com.itma.speciassist.model.VideoMentor;

import java.util.List;

public interface VideoMentorService {
    List<VideoMentor> getVideosByCarriereId(Long carriereId);
    List<VideoMentor> getAllVideos();
    VideoMentor updateVideo(Long id, VideoMentor videoMentor);
    void deleteVideo(Long id);
	List<VideoMentor> getVideosByMentorId(Long mentorId);
	VideoMentor addVideo(Long mentorId, VideoMentor videoMentor);
}