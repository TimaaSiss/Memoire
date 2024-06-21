// video-mentor.model.ts

import { Carriere } from './carriere.model';

export interface VideoMentor {
  id?: number;
  fileName: string;
  title: string;
  carriereId: number;
}
