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

  getVideosByMentor(mentorId: number): Observable<VideoMentor[]> {  // Ajouter cette méthode
    return this.http.get<VideoMentor[]>(`${this.apiUrl}/mentor/${mentorId}`);
  }

  addVideo(mentorId: number, video: VideoMentor): Observable<VideoMentor> {
    return this.http.post<VideoMentor>(`http://localhost:8080/mentor-videos?mentorId=${mentorId}`, video);
  }

  uploadVideo(mentorId: number, formData: FormData): Observable<VideoMentor> {
    const url = `${this.apiUrl}/upload/${mentorId}`;
    return this.http.post<VideoMentor>(url, formData);
  }

  updateVideo(id: number, videoMentor: VideoMentor): Observable<VideoMentor> {
    return this.http.put<VideoMentor>(`${this.apiUrl}/${id}`, videoMentor);
  }

  deleteVideo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
