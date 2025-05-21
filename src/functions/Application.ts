export async function getAllApplication() {
  const response = await fetch("/api/application");
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data.applications;
}

export async function getOneApplication(applicationId: string) {
  const response = await fetch(
    `/api/application?applicationId=${applicationId}`,
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data.application;
}

export async function reviewApplication(
  applicationId: string,
  status: "Pending" | "Accepted" | "Rejected",
) {
  const response = await fetch("/api/application", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ applicationId, status }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data.message;
}
