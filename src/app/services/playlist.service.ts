import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(private http: HttpClient) { }
  getPersonalizedPlaylist(limit: number): Observable<PersonalizedPlaylistResponse> {
    return this.http.get<PersonalizedPlaylistResponse>('/api/personalized', {
      params: { limit }
    });
  }
}

export interface PersonalizedPlaylistResponse {
  hasTaste: boolean;
  code: number;
  category: number;
  result: Result[];
}

interface Result {
  id: number;
  type: number;
  name: string;
  copywriter: string;
  picUrl: string;
  canDislike: boolean;
  trackNumberUpdateTime: number;
  playCount: number;
  trackCount: number;
  highQuality: boolean;
  alg: string;
}
