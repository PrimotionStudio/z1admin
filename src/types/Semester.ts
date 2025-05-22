import { Session } from "./Session";

export interface Semester {
  _id: string;
  name: string;
  sessionId: Session;
  createdAt: string;
}

export interface AddSemester {
  name: string;
  sessionId: string;
}
