import { useState } from 'react'
import { gameApi } from '../lib/gameApi'
import { useToast } from '../ui/Toast'
import Input from '../ui/Input'

export default function AssetForm({ onSaved }) {
  const toast = useToast()
  const [busy, setBusy] = useState(false)
  const [assetName, setAssetName] = useState('')
  const [levelRequire, setLevelRequire] = useState('1')

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      const asset = await gameApi.createAsset({ assetName, levelRequire: parseInt(levelRequire, 10) })
      toast(`Đã tạo tài sản ${asset.assetName}`)
      onSaved(asset)
    } catch (err) {
      toast(err.message, 'bad')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <Input label="Tên tài sản" maxLength={64} required value={assetName} onChange={(e) => setAssetName(e.target.value)} />
      <Input
        label="Cấp yêu cầu tối thiểu"
        type="number"
        min={0}
        required
        value={levelRequire}
        onChange={(e) => setLevelRequire(e.target.value)}
      />
      <button type="submit" className="btn btn--block" disabled={busy}>
        {busy ? 'Đang lưu…' : 'Tạo tài sản'}
      </button>
    </form>
  )
}
