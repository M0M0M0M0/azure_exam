import { useState } from 'react'
import { gameApi } from '../lib/gameApi'
import { useToast } from '../ui/Toast'
import Input from '../ui/Input'

export default function PlayerForm({ onSaved }) {
  const toast = useToast()
  const [busy, setBusy] = useState(false)
  const [values, setValues] = useState({ playerName: '', fullName: '', age: '', level: '1', email: '' })

  const bind = (name) => ({
    name,
    value: values[name],
    onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })),
  })

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      const player = await gameApi.registerPlayer({ ...values, level: parseInt(values.level, 10) })
      toast(`Đã đăng ký ${player.playerName}`)
      onSaved(player)
    } catch (err) {
      toast(err.message, 'bad')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <Input label="Tên nhân vật" maxLength={64} required {...bind('playerName')} />
      <Input label="Họ và tên" maxLength={128} required {...bind('fullName')} />
      <div className="form__pair">
        <Input label="Tuổi" maxLength={10} required {...bind('age')} />
        <Input label="Cấp hiện tại" type="number" min={1} required {...bind('level')} />
      </div>
      <Input label="Email" type="email" maxLength={64} required {...bind('email')} />
      <button type="submit" className="btn btn--block" disabled={busy}>
        {busy ? 'Đang lưu…' : 'Đăng ký'}
      </button>
    </form>
  )
}
