import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  getPersionalizedNewSong(limit: number): Observable<NewSongResponse> {
    return this.http.get<NewSongResponse>('/api/personalized/newsong', {
      params: { limit }
    });
  }

  getSongUrl(id: number): Observable<SongUrlResponse> {
    return this.http.get<SongUrlResponse>('/api/song/url', {
      params: { id }
    })
  }

  // 获取歌曲详情
  getSongDetail(ids: string): Observable<SongDetailResponse> {
    return this.http.get<SongDetailResponse>('/api/song/detail', {
      params: { ids }
    });
  }
}

export interface NewSongResponse {
  code: number;
  category: number;
  result: Result[];
}

interface Result {
  id: number;
  type: number;
  name: string;
  copywriter: null;
  picUrl: string;
  canDislike: boolean;
  trackNumberUpdateTime: null;
  song: Song;
  alg: string;
}

export interface Song {
  name: string;
  id: number;
  position: number;
  alias: any[];
  status: number;
  fee: number;
  copyrightId: number;
  disc: string;
  no: number;
  artists: Artist[];
  album: Album;
  starred: boolean;
  popularity: number;
  score: number;
  starredNum: number;
  duration: number;
  playedNum: number;
  dayPlays: number;
  hearTime: number;
  sqMusic: SqMusic;
  hrMusic: SqMusic;
  ringtone: string;
  crbt: null;
  audition: null;
  copyFrom: string;
  commentThreadId: string;
  rtUrl: null;
  ftype: number;
  rtUrls: any[];
  copyright: number;
  transName: string;
  sign: null;
  mark: number;
  originCoverType: number;
  originSongSimpleData: null;
  single: number;
  hMusic: SqMusic;
  mMusic: SqMusic;
  lMusic: SqMusic;
  bMusic: SqMusic;
  mvid: number;
  rtype: number;
  rurl: null;
  mp3Url: null;
  transNames: string[];
  privilege: Privilege;
  pst: number;
  t: number;
  ar: Ar[];
  pop: number;
  rt: string;
  v: number;
  cf: string;
  dt: number;
  h: H;
  m: H;
  l: H;
  sq: H;
  hr: null;
  a: null;
  cd: string;
  djId: number;
  s_id: number;
  tagPicList: null;
  resourceState: boolean;
  version: number;
  songJumpInfo: null;
  entertainmentTags: null;
  awardTags: null;
  mv: number;
  mst: number;
  cp: number;
  publishTime: number;
  tns: string[];
}

interface Privilege {
  id: number;
  fee: number;
  payed: number;
  st: number;
  pl: number;
  dl: number;
  sp: number;
  cp: number;
  subp: number;
  cs: boolean;
  maxbr: number;
  fl: number;
  toast: boolean;
  flag: number;
  preSell: boolean;
  playMaxbr: number;
  downloadMaxbr: number;
  maxBrLevel: string;
  playMaxBrLevel: string;
  downloadMaxBrLevel: string;
  plLevel: string;
  dlLevel: string;
  flLevel: string;
  rscl: null;
  freeTrialPrivilege: FreeTrialPrivilege;
  rightSource: number;
  chargeInfoList: ChargeInfoList[];
}

interface ChargeInfoList {
  rate: number;
  chargeUrl: null;
  chargeMessage: null;
  chargeType: number;
}

interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType: null;
  cannotListenReason: null;
  playReason: null;
}

interface SqMusic {
  name: null;
  id: number;
  size: number;
  extension: string;
  sr: number;
  dfsId: number;
  bitrate: number;
  playTime: number;
  volumeDelta: number;
}

interface Album {
  name: string;
  id: number;
  type: string;
  size: number;
  picId: number;
  blurPicUrl: string;
  companyId: number;
  pic: number;
  picUrl: string;
  publishTime: number;
  description: string;
  tags: string;
  company: string;
  briefDesc: string;
  artist: Artist;
  songs: any[];
  alias: any[];
  status: number;
  copyrightId: number;
  commentThreadId: string;
  artists: Artist[];
  subType: string;
  transName: null;
  onSale: boolean;
  mark: number;
  gapless: number;
  picId_str: string;
}

interface Artist {
  name: string;
  id: number;
  picId: number;
  img1v1Id: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  albumSize: number;
  alias: any[];
  trans: string;
  musicSize: number;
  topicPerson: number;
}

interface SongUrlResponse {
  code: number;
  data: Datum[];
}

interface Datum {
  id: number;
  url: string;
  br: number;
  size: number;
  md5: string;
  code: number;
  expi: number;
  type: string;
  gain: number;
  peak: number;
  fee: number;
  uf: null;
  payed: number;
  flag: number;
  canExtend: boolean;
  freeTrialInfo: null;
  level: string;
  encodeType: string;
  channelLayout: null;
  freeTrialPrivilege: FreeTrialPrivilege;
  freeTimeTrialPrivilege: FreeTimeTrialPrivilege;
  urlSource: number;
  rightSource: number;
  podcastCtrp: null;
  effectTypes: null;
  time: number;
  message: null;
  levelConfuse: null;
  musicId: string;
}

interface FreeTimeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  type: number;
  remainTime: number;
}

interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType: null;
  cannotListenReason: null;
  playReason: null;
  freeLimitTagType: null;
}

interface SongDetailResponse {
  songs: Song[];
  privileges: Privilege[];
  code: number;
}

interface Privilege {
  id: number;
  fee: number;
  payed: number;
  st: number;
  pl: number;
  dl: number;
  sp: number;
  cp: number;
  subp: number;
  cs: boolean;
  maxbr: number;
  fl: number;
  toast: boolean;
  flag: number;
  preSell: boolean;
  playMaxbr: number;
  downloadMaxbr: number;
  maxBrLevel: string;
  playMaxBrLevel: string;
  downloadMaxBrLevel: string;
  plLevel: string;
  dlLevel: string;
  flLevel: string;
  rscl: null;
  freeTrialPrivilege: FreeTrialPrivilege;
  rightSource: number;
  chargeInfoList: ChargeInfoList[];
  code: number;
  message: null;
}

interface ChargeInfoList {
  rate: number;
  chargeUrl: null;
  chargeMessage: null;
  chargeType: number;
}

interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType: null;
  cannotListenReason: null;
  playReason: null;
  freeLimitTagType: null;
}

export interface Song {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: Ar[];
  alia: any[];
  pop: number;
  st: number;
  rt: string;
  fee: number;
  v: number;
  crbt: null;
  cf: string;
  al: Al;
  dt: number;
  h: H;
  m: H;
  l: H;
  sq: H;
  hr: null;
  a: null;
  cd: string;
  no: number;
  rtUrl: null;
  ftype: number;
  rtUrls: any[];
  djId: number;
  copyright: number;
  s_id: number;
  mark: number;
  originCoverType: number;
  originSongSimpleData: null;
  tagPicList: null;
  resourceState: boolean;
  version: number;
  songJumpInfo: null;
  entertainmentTags: null;
  awardTags: null;
  single: number;
  noCopyrightRcmd: null;
  mv: number;
  rtype: number;
  rurl: null;
  mst: number;
  cp: number;
  publishTime: number;
  tns: string[];
}

interface H {
  br: number;
  fid: number;
  size: number;
  vd: number;
  sr: number;
}

interface Al {
  id: number;
  name: string;
  picUrl: string;
  tns: string[];
  pic_str: string;
  pic: number;
}

interface Ar {
  id: number;
  name: string;
  tns: any[];
  alias: any[];
}
