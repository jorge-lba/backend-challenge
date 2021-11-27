import { Status } from '../enums/Status.enum';

export interface IAnswers {
  id: string;
  challengeId: string;
  link: string;
  status: Status;
  grade: number;
}
