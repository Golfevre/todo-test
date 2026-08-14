import { useState } from 'react'
import type { FormEvent } from 'react'

interface Props {
  onAdd: (text: string) => void
}

export function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text)
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        placeholder="やることを入力..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      <button className="todo-add-btn" type="submit">
        追加
      </button>
    </form>
  )
}
