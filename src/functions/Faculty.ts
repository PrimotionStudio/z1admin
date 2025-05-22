export async function getAllFaculties() {
  const response = await fetch("/api/faculty");
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data.faculties;
}

export async function addFaculty(name: string, description: string) {
  const response = await fetch("/api/faculty", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data.message;
}
