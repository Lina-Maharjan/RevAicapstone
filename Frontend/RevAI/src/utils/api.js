const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

async function parseResponse(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return { message: text };
  }
}

export async function apiFetch(path, opts = {}) {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", ...(opts.headers || {}) };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  const data = await parseResponse(res);

  if (!res.ok) {
    // normalize FastAPI HTTPException.detail and other error formats
    const err = data && (data.detail || data.message) ? (data.detail || data.message) : { message: 'Request failed' };
    throw err;
  }
  return data;
}

export function setToken(token) {
  if (token) localStorage.setItem('token', token);
}

export function clearToken() {
  localStorage.removeItem('token');
}

export default { apiFetch, setToken, clearToken };
