// src/app/services/video-mentor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoMentor } from '@app/model/video-mentor';

@Injectable({
  providedIn: 'root'
})
export class VideoMentorService {
  private apiUrl = 'http://localhost:8080/mentor-videos';

  constructor(private http: HttpClient) { }

  getVideosByCarriereId(carriereId: number): Observable<VideoMentor[]> {
    return this.http.get<VideoMentor[]>(`${this.apiUrl}/${carriereId}`);
  }

  addVideo(videoMentor: VideoMentor): Observable<VideoMentor> {
    return this.http.post<VideoMentor>(this.apiUrl, videoMentor);
  }

  updateVideo(id: number, videoMentor: VideoMentor): Observable<VideoMentor> {
    return this.http.put<VideoMentor>(`${this.apiUrl}/${id}`, videoMentor);
  }

  deleteVideo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
