// video-mentor.model.ts

import { Carriere } from './carriere.model';
import { User } from './user';

export interface VideoMentor {
  id: number;
  fileName: string;
  title: string;
  url:string;
  carriereId: number;
  mentorId: number;
}
