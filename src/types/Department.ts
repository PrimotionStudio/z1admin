import { Faculty } from "./Faculty";

export interface Department {
  _id: string;
  facultyId: Faculty;
  name: string;
  description: string;
  createdAt: string;
}

export interface AddFaculty {
  facultyId: string;
  name: string;
  description: string;
}
