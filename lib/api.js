const API_URL = "https://SEU_BACKEND_URL";

export async function testarMac() {
  const response = await fetch(`${API_URL}/teste`);
  return response.json();
}
