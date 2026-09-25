const BASE = import.meta.env.VITE_FUNCTIONS_URL ?? 'http://localhost:7071/api'

const call = async (endpoint, { body, ...init } = {}) => {
  const res = await fetch(`${BASE}/${endpoint}`, {
    ...init,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error((json.details ?? [json.message ?? `HTTP ${res.status}`]).join(' • '))
  return json.result
}

export const gameApi = {
  report: () => call('getassetsbyplayer'),
  players: () => call('getplayers'),
  assets: () => call('getassets'),
  registerPlayer: (body) => call('registerplayer', { method: 'POST', body }),
  createAsset: (body) => call('createasset', { method: 'POST', body }),
  grantAsset: (body) => call('assignasset', { method: 'POST', body }),
}
