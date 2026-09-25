import { useState } from 'react'
import { gameApi } from '../lib/gameApi'
import useResource from '../lib/useResource'
import Grid from '../ui/Grid'
import Modal from '../ui/Modal'
import PlayerForm from '../forms/PlayerForm'

const COLUMNS = [
  { field: 'idx', title: '#', width: 50, render: (_, i) => i + 1 },
  { field: 'playerName', title: 'Tên nhân vật' },
  { field: 'fullName', title: 'Họ tên' },
  { field: 'age', title: 'Tuổi' },
  { field: 'level', title: 'Cấp', render: (r) => <span className="pill">Lv. {r.level}</span> },
  { field: 'email', title: 'Email' },
]

export default function PlayersView() {
  const players = useResource(gameApi.players)
  const [creating, setCreating] = useState(false)

  const handleSaved = () => {
    setCreating(false)
    players.reload()
  }

  return (
    <>
      <header className="page-head">
        <div>
          <h1>Người chơi</h1>
          <p>{players.items.length} tài khoản đã đăng ký</p>
        </div>
        <button type="button" className="btn" onClick={() => setCreating(true)}>
          + Đăng ký người chơi
        </button>
      </header>
      <div className="panel">
        <Grid columns={COLUMNS} rows={players.items} rowKey={(r) => r.id} loading={players.loading} failed={players.failed} />
      </div>
      {creating && (
        <Modal title="Đăng ký người chơi" onClose={() => setCreating(false)}>
          <PlayerForm onSaved={handleSaved} />
        </Modal>
      )}
    </>
  )
}
