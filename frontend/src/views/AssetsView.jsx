import { useState } from 'react'
import { gameApi } from '../lib/gameApi'
import useResource from '../lib/useResource'
import Grid from '../ui/Grid'
import Modal from '../ui/Modal'
import AssetForm from '../forms/AssetForm'
import GrantForm from '../forms/GrantForm'

const COLUMNS = [
  { field: 'idx', title: '#', width: 50, render: (_, i) => i + 1 },
  { field: 'assetName', title: 'Tên tài sản' },
  { field: 'levelRequire', title: 'Cấp yêu cầu', render: (r) => <span className="pill pill--gold">≥ Lv. {r.levelRequire}</span> },
]

export default function AssetsView() {
  const assets = useResource(gameApi.assets)
  const [dialog, setDialog] = useState(null)

  const closeAndRefresh = () => {
    setDialog(null)
    assets.reload()
  }

  return (
    <>
      <header className="page-head">
        <div>
          <h1>Kho tài sản</h1>
          <p>Hero, trang bị và vật phẩm trong game</p>
        </div>
        <div className="actions">
          <button type="button" className="btn btn--ghost" onClick={() => setDialog('grant')}>
            ⇄ Trao tài sản
          </button>
          <button type="button" className="btn" onClick={() => setDialog('create')}>
            + Tạo tài sản
          </button>
        </div>
      </header>
      <div className="panel">
        <Grid columns={COLUMNS} rows={assets.items} rowKey={(r) => r.id} loading={assets.loading} failed={assets.failed} />
      </div>
      {dialog === 'create' && (
        <Modal title="Tạo tài sản mới" onClose={() => setDialog(null)}>
          <AssetForm onSaved={closeAndRefresh} />
        </Modal>
      )}
      {dialog === 'grant' && (
        <Modal title="Trao tài sản cho người chơi" onClose={() => setDialog(null)}>
          <GrantForm assets={assets.items} onSaved={() => setDialog(null)} />
        </Modal>
      )}
    </>
  )
}
