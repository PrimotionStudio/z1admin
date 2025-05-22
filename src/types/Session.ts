import { Department } from "./Department";

export interface Session {
  _id: string;
  departmentId: Department;
  name: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface AddSession {
  departmentId: string;
  name: string;
  startDate: string;
  endDate: string;
}
