import { useMemo, useState } from 'react'
import type { Filter } from './types'
import { useTodos } from './hooks/useTodos'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { FilterBar } from './components/FilterBar'
import './App.css'

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted, toggleAll } = useTodos()
  const [filter, setFilter] = useState<Filter>('all')

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed)
      case 'completed':
        return todos.filter((todo) => todo.completed)
      default:
        return todos
    }
  }, [todos, filter])

  const remaining = todos.filter((todo) => !todo.completed).length
  const hasCompleted = todos.some((todo) => todo.completed)
  const allCompleted = todos.length > 0 && remaining === 0

  return (
    <div className="app">
      <div className="card">
        <header className="app-header">
          <h1>TODO</h1>
          {todos.length > 0 && (
            <label className="toggle-all">
              <input type="checkbox" checked={allCompleted} onChange={(e) => toggleAll(e.target.checked)} />
              すべて完了にする
            </label>
          )}
        </header>

        <TodoForm onAdd={addTodo} />

        <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />

        {todos.length > 0 && (
          <FilterBar
            filter={filter}
            onChange={setFilter}
            remaining={remaining}
            hasCompleted={hasCompleted}
            onClearCompleted={clearCompleted}
          />
        )}
      </div>
    </div>
  )
}

export default App
