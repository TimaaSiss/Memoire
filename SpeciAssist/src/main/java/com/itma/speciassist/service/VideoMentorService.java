package com.itma.speciassist.service;

import com.itma.speciassist.model.VideoMentor;

import java.util.List;

public interface VideoMentorService {
    List<VideoMentor> getVideosByCarriereId(Long carriereId);
    VideoMentor addVideo(VideoMentor videoMentor);
    VideoMentor updateVideo(Long id, VideoMentor videoMentor);
    void deleteVideo(Long id);
}