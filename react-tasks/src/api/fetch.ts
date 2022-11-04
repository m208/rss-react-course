export async function getJson<TResponse>(url: URL, method: string): Promise<TResponse> {
  const response = await fetch(url, { method });

  if (response.status === 200) {
    const json = await response.json();
    return json;
  }

  throw new Error(response.status.toString());
}
