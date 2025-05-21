export interface RegisterUser {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface LoggedInUser {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  role: "Admin" | "Exam Officer" | "Lecturer" | "Student" | "User";
}

export interface UserLoggedInState {
  user: LoggedInUser | null;
  setUser: (user: LoggedInUser) => void;
  clearUser: () => void;
  loadUserFromCookie: () => Promise<void>;
  logout: () => Promise<void>;
}

export interface UserRoleChange {
  userId: string;
  role: LoggedInUser["role"];
}
