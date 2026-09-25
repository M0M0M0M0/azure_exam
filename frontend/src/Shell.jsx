import { useState } from 'react'
import ReportView from './views/ReportView'
import PlayersView from './views/PlayersView'
import AssetsView from './views/AssetsView'

const MENU = [
  { key: 'report', icon: '📊', text: 'Báo cáo tài sản', View: ReportView },
  { key: 'players', icon: '🎮', text: 'Người chơi', View: PlayersView },
  { key: 'assets', icon: '🛡️', text: 'Kho tài sản', View: AssetsView },
]

export default function Shell() {
  const [active, setActive] = useState(MENU[0].key)
  const current = MENU.find((m) => m.key === active)

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand__logo">⚔</span>
          <div>
            <strong>Battle Game</strong>
            <small>Studio Console</small>
          </div>
        </div>
        <nav className="menu">
          {MENU.map((m) => (
            <button
              key={m.key}
              type="button"
              className={`menu__item${m.key === active ? ' is-active' : ''}`}
              onClick={() => setActive(m.key)}
            >
              <span>{m.icon}</span>
              {m.text}
            </button>
          ))}
        </nav>
      </aside>
      <section className="content">
        <current.View />
      </section>
    </div>
  )
}
