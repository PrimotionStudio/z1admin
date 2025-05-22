export async function getDepartmentsByFacultyId(facultyId: string) {
  const response = await fetch("/api/faculty");
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data.faculties;
}
