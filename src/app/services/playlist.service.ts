import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(private http: HttpClient) { }
  // 获取首页推荐歌单
  getPersonalizedPlaylist(limit: number): Observable<PersonalizedPlaylistResponse> {
    return this.http.get<PersonalizedPlaylistResponse>('/api/personalized', {
      params: { limit }
    });
  }
  // 获取歌单详情
  getPlaylistDetail(id: number): Observable<PlaylistDetailResponse> {
    return this.http.get<PlaylistDetailResponse>('/api/playlist/detail', {
      params: { id }
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

interface PlaylistDetailResponse {
  code: number;
  relatedVideos: RelatedVideos;
  playlist: Playlist;
  urls: null;
  privileges: null;
  sharedPrivilege: null;
  resEntrance: null;
  fromUsers: null;
  fromUserCount: number;
  songFromUsers: null;
}

export interface Playlist {
  id: number;
  name: string;
  coverImgId: number;
  coverImgUrl: string;
  coverImgId_str: null;
  adType: number;
  userId: number;
  createTime: number;
  status: number;
  opRecommend: boolean;
  highQuality: boolean;
  newImported: boolean;
  updateTime: number;
  trackCount: number;
  specialType: number;
  privacy: number;
  trackUpdateTime: number;
  commentThreadId: string;
  playCount: number;
  trackNumberUpdateTime: number;
  subscribedCount: number;
  cloudTrackCount: number;
  ordered: boolean;
  description: null;
  tags: any[];
  updateFrequency: null;
  backgroundCoverId: number;
  backgroundCoverUrl: null;
  titleImage: number;
  titleImageUrl: null;
  detailPageTitle: null;
  englishTitle: null;
  officialPlaylistType: null;
  copied: boolean;
  relateResType: null;
  coverStatus: number;
  subscribers: any[];
  subscribed: boolean;
  creator: null;
  tracks: any[];
  videoIds: null;
  videos: null;
  trackIds: any[];
  bannedTrackIds: null;
  mvResourceInfos: null;
  shareCount: number;
  commentCount: number;
  remixVideo: null;
  newDetailPageRemixVideo: null;
  sharedUsers: null;
  historySharedUsers: null;
  gradeStatus: string;
  score: null;
  algTags: null;
  distributeTags: any[];
  trialMode: null;
  displayTags: null;
  displayUserInfoAsTagOnly: boolean;
  playlistType: string;
  bizExtInfo: RelatedVideos;
}

interface RelatedVideos {
}
