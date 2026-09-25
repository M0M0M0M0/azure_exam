import { gameApi } from '../lib/gameApi'
import useResource from '../lib/useResource'
import Grid from '../ui/Grid'

const COLUMNS = [
  { field: 'no', title: 'No', width: 70 },
  { field: 'playerName', title: 'Player name' },
  { field: 'level', title: 'Level' },
  { field: 'age', title: 'Age' },
  { field: 'assetName', title: 'Asset name' },
]

export default function ReportView() {
  const report = useResource(gameApi.report)
  const owners = new Set(report.items.map((r) => r.playerName)).size

  return (
    <>
      <header className="page-head">
        <div>
          <h1>Báo cáo tài sản người chơi</h1>
          <p>Danh sách tài sản mà mỗi người chơi đang sở hữu</p>
        </div>
        <button type="button" className="btn btn--ghost" onClick={report.reload}>
          ⟳ Làm mới
        </button>
      </header>
      <div className="stats">
        <div className="stat">
          <small>Lượt sở hữu</small>
          <b>{report.items.length}</b>
        </div>
        <div className="stat">
          <small>Người chơi có tài sản</small>
          <b>{owners}</b>
        </div>
      </div>
      <div className="panel">
        <Grid columns={COLUMNS} rows={report.items} rowKey={(r) => r.no} loading={report.loading} failed={report.failed} />
      </div>
    </>
  )
}
