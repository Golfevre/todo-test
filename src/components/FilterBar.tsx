import type { Filter } from '../types'

interface Props {
  filter: Filter
  onChange: (filter: Filter) => void
  remaining: number
  hasCompleted: boolean
  onClearCompleted: () => void
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'すべて' },
  { key: 'active', label: '未完了' },
  { key: 'completed', label: '完了済み' },
]

export function FilterBar({ filter, onChange, remaining, hasCompleted, onClearCompleted }: Props) {
  return (
    <div className="filter-bar">
      <span className="remaining-count">残り {remaining} 件</span>

      <div className="filter-buttons">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            className={`filter-btn ${filter === key ? 'active' : ''}`}
            onClick={() => onChange(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <button className="clear-btn" onClick={onClearCompleted} disabled={!hasCompleted}>
        完了済みを削除
      </button>
    </div>
  )
}
