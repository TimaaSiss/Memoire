import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoMentor } from '@app/model/video-mentor';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class VideoMentorService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getVideosByMentor(mentorId: number): Observable<VideoMentor[]> {
    return this.http.get<VideoMentor[]>(`${this.configService.apiUrl}/mentor-videos/mentor/${mentorId}`);
  }

  getVideo(fileName: string): Observable<Blob> {
    return this.http.get(`${this.configService.apiUrl}/mentor-videos/videos/${fileName}`, { responseType: 'blob' });
  }
  getVideosByCarriereId(carriereId: number): Observable<VideoMentor[]> {
    return this.http.get<VideoMentor[]>(`${this.configService.apiUrl}/mentor-videos/carriere/${carriereId}`);
  }

  uploadVideo(mentorId: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.configService.apiUrl}/mentor-videos/upload`, formData);
  }

  updateVideo(id: number, videoMentor: VideoMentor): Observable<VideoMentor> {
    return this.http.put<VideoMentor>(`${this.configService.apiUrl}/mentor-videos/${id}`, videoMentor);
  }

  deleteVideo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.configService.apiUrl}/mentor-videos/delete/${id}`);
  }
}
