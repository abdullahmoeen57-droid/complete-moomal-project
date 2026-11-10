export const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '');

export function toCamel<T = any>(value: any): T {
  if (Array.isArray(value)) return value.map(toCamel) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => {
      const mapped = toCamel(item);
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      if ((key === 'image' || key === 'image_url' || key === 'photo_url') && typeof mapped === 'string' && mapped.startsWith('/uploads/')) return [camelKey, `${API_BASE}${mapped}`];
      return [camelKey, mapped];
    })) as T;
  }
  return value as T;
}
export function toSnake(value: any): any {
  if (Array.isArray(value)) return value.map(toSnake);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`), toSnake(item)]));
  return value;
}
export async function apiRequest<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, { ...options, credentials: 'include', headers: { ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...options.headers } });
  const payload = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) throw new Error(payload?.detail || `Request failed (${response.status})`);
  return payload as T;
}
export async function uploadImage(file: File): Promise<string> {
  const form = new FormData(); form.append('file', file);
  const result = await apiRequest<{url:string}>('/api/uploads/image', {method:'POST', body:form});
  return result.url.startsWith('http') ? result.url : `${API_BASE}${result.url}`;
}
