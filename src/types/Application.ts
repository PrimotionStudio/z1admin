import { LoggedInUser } from "@/types/User";

export interface Application {
  _id: string;
  userId: string & LoggedInUser;
  program: string;
  dateOfBirth: string;
  stateOfOrigin: string;
  lga: string;
  contactAddress: string;
  nextOfKin: string;
  nextOfKinPhone: string;

  examType: string;
  examNumber: string;
  examYear: string;
  subjects: Array<{
    subject: string;
    grade: string;
  }>;
  resultFile: {
    url: string;
    mime: string;
  };
  termsAccepted: boolean;
  status: "Pending" | "Accepted" | "Rejected";
  createdAt: string;
}

export interface ApplicationReview {
  applicationId: string;
  status: "Pending" | "Accepted" | "Rejected";
}
