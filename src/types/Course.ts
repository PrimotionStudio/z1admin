import { Semester } from "./Semester";
import { LoggedInUser } from "./User";

export interface Course {
  _id: string;
  name: string;
  code: string;
  units: number;
  lecturer: LoggedInUser;
  semesterId: Semester;
  createdAt: string;
}

export interface AddCourse {
  name: string;
  code: string;
  units: number;
  lecturer: string;
  semesterId: string;
}
