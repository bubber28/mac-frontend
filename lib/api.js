const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function testarMac() {
  const response = await fetch(`${API_URL}/teste`);
  return response.json();
}
