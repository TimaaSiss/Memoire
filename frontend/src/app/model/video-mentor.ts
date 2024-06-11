// video-mentor.model.ts

import { Carriere } from './carriere.model';

export interface VideoMentor {
  id?: number;
  url: string;
  title: string;
  carriere: Carriere;
}
