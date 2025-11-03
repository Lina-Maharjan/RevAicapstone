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
  const token = localStorage.getItem("access_token");
  const headers = { "Content-Type": "application/json", ...(opts.headers || {}) };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  const data = await parseResponse(res);

  if (!res.ok) {
    // Normalize FastAPI HTTPException.detail and other error formats
    // Keep the structure intact so frontend can check err.detail.requires_auth
    if (data && data.detail && typeof data.detail === 'object') {
      throw data;  // Preserve { detail: { message, requires_auth, ... } }
    }
    // Otherwise create a normalized error structure
    const errorMessage = data && (data.detail || data.message) ? (data.detail || data.message) : 'Request failed';
    throw { detail: errorMessage };
  }
  return data;
}

export function setToken(token) {
  if (token) localStorage.setItem('access_token', token);
}

export function clearToken() {
  localStorage.removeItem('access_token');
}

export default { apiFetch, setToken, clearToken };


// const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// async function parseResponse(res) {
//   const text = await res.text();
//   try {
//     return text ? JSON.parse(text) : null;
//   } catch {
//     return { message: text };
//   }
// }

// export async function apiFetch(path, opts = {}) {
//   const token = localStorage.getItem("access_token");
//   const headers = { "Content-Type": "application/json", ...(opts.headers || {}) };
//   if (token) headers["Authorization"] = `Bearer ${token}`;

//   const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
//   const data = await parseResponse(res);

//   if (!res.ok) {
//     // Normalize FastAPI HTTPException.detail and other error formats
//     // Keep the structure intact so frontend can check err.detail.requires_auth
//     if (data && data.detail && typeof data.detail === 'object') {
//       throw data;  // Preserve { detail: { message, requires_auth, ... } }
//     }
//     // Otherwise create a normalized error structure
//     const errorMessage = data && (data.detail || data.message) ? (data.detail || data.message) : 'Request failed';
//     throw { detail: errorMessage };
//   }
//   return data;
// }

// export function setToken(token) {
//   if (token) localStorage.setItem('access_token', token);
// }

// export function clearToken() {
//   localStorage.removeItem('access_token');
// }

// export default { apiFetch, setToken, clearToken };
