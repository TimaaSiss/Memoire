import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoMentor } from '@app/model/video-mentor';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class VideoMentorService {
 

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getVideosByCarriereId(carriereId: number): Observable<VideoMentor[]> {
    return this.http.get<VideoMentor[]>(`${this.configService.apiUrl}/mentor-videos/${carriereId}`);
  }

  getVideosByMentor(mentorId: number): Observable<VideoMentor[]> {
    return this.http.get<VideoMentor[]>(`${this.configService.apiUrl}/mentor-videos/mentor/${mentorId}`);
  }

  addVideo(mentorId: number, video: VideoMentor): Observable<VideoMentor> {
    return this.http.post<VideoMentor>(`http://localhost:8080/mentor-videos?mentorId=${mentorId}`, video);
  }

  uploadVideo(mentorId: number, formData: FormData): Observable<VideoMentor> {
    return this.http.post<VideoMentor>(`${this.configService.apiUrl}/mentor-videos/upload/${mentorId}`, formData);
  }

  updateVideo(id: number, videoMentor: VideoMentor): Observable<VideoMentor> {
    return this.http.put<VideoMentor>(`${this.configService.apiUrl}/mentor-videos/${id}`, videoMentor);
  }

  deleteVideo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.configService.apiUrl}/mentor-videos/${id}`);
  }

  getVideoUrl(fileName: string): string {
    return `${this.configService.apiUrl}/mentor-videos/videos/${fileName}`;
  }
}
