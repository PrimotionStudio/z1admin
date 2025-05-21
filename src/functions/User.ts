import { LoggedInUser, LoginUser, RegisterUser } from "@/types/User";

export function validateRegisterUserForm(user: RegisterUser) {
  if (user.fullName.trim().length < 2)
    throw new Error("Name must be at least 2 characters");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user.email))
    throw new Error("Please enter a valid email address");

  if (user.phone.trim().length < 10)
    throw new Error("Please enter a valid phone number");

  if (user.password.length < 8)
    throw new Error("Password must be at least 8 characters");

  if (user.password !== user.confirmPassword)
    throw new Error("Passwords must match");

  return true;
}

export function validateLoginUserForm(user: LoginUser) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user.email))
    throw new Error("Please enter a valid email address");
  return true;
}

export async function registerUser(user: RegisterUser) {
  validateRegisterUserForm(user);
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data.message;
}

export async function activateUser(token: string) {
  const response = await fetch(`/api/activate`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data.message;
}

export async function loginUser(user: LoginUser) {
  validateLoginUserForm(user);
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data.message;
}

export async function getAllUsers() {
  const response = await fetch("/api/user");
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data.users;
}

export async function getAllStudents() {
  const response = await fetch("/api/user/student");
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data.users;
}

export async function changeUserRole(
  userId: string,
  role: LoggedInUser["role"],
) {
  const response = await fetch("/api/user/role", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, role }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data.message;
}
