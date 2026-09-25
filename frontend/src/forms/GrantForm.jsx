import { useState } from 'react'
import { gameApi } from '../lib/gameApi'
import useResource from '../lib/useResource'
import { useToast } from '../ui/Toast'
import Input from '../ui/Input'

export default function GrantForm({ assets, onSaved }) {
  const toast = useToast()
  const players = useResource(gameApi.players)
  const [busy, setBusy] = useState(false)
  const [playerId, setPlayerId] = useState('')
  const [assetId, setAssetId] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      await gameApi.grantAsset({ playerId, assetId })
      const who = players.items.find((p) => p.id === playerId)
      const what = assets.find((a) => a.id === assetId)
      toast(`${who.playerName} đã nhận ${what.assetName}`)
      onSaved()
    } catch (err) {
      toast(err.message, 'bad')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <Input label="Người chơi" as="select" required value={playerId} onChange={(e) => setPlayerId(e.target.value)}>
        <option value="">— Chọn người chơi —</option>
        {players.items.map((p) => (
          <option key={p.id} value={p.id}>
            {p.playerName} · Lv. {p.level}
          </option>
        ))}
      </Input>
      <Input label="Tài sản" as="select" required value={assetId} onChange={(e) => setAssetId(e.target.value)}>
        <option value="">— Chọn tài sản —</option>
        {assets.map((a) => (
          <option key={a.id} value={a.id}>
            {a.assetName} · yêu cầu Lv. {a.levelRequire}
          </option>
        ))}
      </Input>
      <button type="submit" className="btn btn--block" disabled={busy}>
        {busy ? 'Đang xử lý…' : 'Xác nhận trao'}
      </button>
    </form>
  )
}
