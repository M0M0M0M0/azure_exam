export default function Grid({ columns, rows, rowKey, loading, failed, emptyText = 'Chưa có dữ liệu' }) {
  if (loading) return <div className="grid-state">Đang tải dữ liệu…</div>
  if (failed) return <div className="grid-state grid-state--bad">{failed}</div>
  if (!rows.length) return <div className="grid-state">{emptyText}</div>

  return (
    <div className="grid-wrap">
      <table className="grid">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.field} style={{ width: c.width }}>
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={rowKey(r, idx)}>
              {columns.map((c) => (
                <td key={c.field}>{c.render ? c.render(r, idx) : r[c.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
