import { useState, useEffect } from 'react';
import { useTodos } from '../hooks/useTodos';
import { useTodoContext } from '../context/TodoContext';
import { useNotification } from '../hooks/useNotification';
import { Header } from '../components/Header';
import { FilterBar } from '../components/FilterBar';
import { TaskList } from '../components/TaskList';
import { AddTaskModal } from '../components/AddTaskModal';
import { CalendarView } from '../components/CalendarView';
import { DayTasksModal } from '../components/DayTasksModal';
import { ViewToggle } from '../components/ViewToggle';
import { Settings } from './Settings';
import type { Todo } from '../types/todo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const Home = () => {
  const {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    filter,
    sort,
    searchQuery,
    setFilter,
    setSort,
    setSearchQuery,
  } = useTodos();

  const { todos: allTodos } = useTodoContext();
  const { sendNotification, permission } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>();
  const [showSettings, setShowSettings] = useState(false);
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showDayTasks, setShowDayTasks] = useState(false);

  const uncompletedCount = allTodos.filter(t => !t.completed).length;

  // 期限通知チェック
  useEffect(() => {
    if (permission !== 'granted') return;

    const checkDeadlines = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      allTodos.forEach(todo => {
        if (!todo.completed && todo.dueDate) {
          const dueDate = new Date(todo.dueDate);
          if (dueDate.toDateString() === tomorrow.toDateString()) {
            sendNotification('明日が期限のタスク', todo.title);
          }
        }
      });
    };

    checkDeadlines();
    const interval = setInterval(checkDeadlines, 3600000); // 1時間ごと
    return () => clearInterval(interval);
  }, [allTodos, sendNotification, permission]);

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleSave = (todo: Omit<Todo, 'id' | 'createdAt'>) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, todo);
    } else {
      addTodo(todo);
    }
    setSelectedDate(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTodo(undefined);
    setSelectedDate(null);
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setShowDayTasks(true);
  };

  const handleUpdateSubtask = (todoId: string, subtaskId: string, completed: boolean) => {
    const todo = allTodos.find(t => t.id === todoId);
    if (todo && todo.subtasks) {
      const updatedSubtasks = todo.subtasks.map(s =>
        s.id === subtaskId ? { ...s, completed } : s
      );
      updateTodo(todoId, { subtasks: updatedSubtasks });
    }
  };

  const dayTodos = selectedDate
    ? allTodos.filter(t => t.dueDate === selectedDate)
    : [];

  if (showSettings) {
    return <Settings onBack={() => setShowSettings(false)} />;
  }

  return (
    <div className="mx-auto min-h-screen max-w-4xl p-4">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        uncompletedCount={uncompletedCount}
        onSettingsClick={() => setShowSettings(true)}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <FilterBar
          filter={filter}
          sort={sort}
          onFilterChange={setFilter}
          onSortChange={setSort}
        />
        <ViewToggle view={view} onViewChange={setView} />
      </div>

      <div className="mt-6">
        {view === 'list' ? (
          <TaskList
            todos={todos}
            onToggle={toggleComplete}
            onDelete={deleteTodo}
            onEdit={handleEdit}
            onUpdateSubtask={handleUpdateSubtask}
          />
        ) : (
          <CalendarView todos={allTodos} onDateClick={handleDateClick} />
        )}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
        aria-label="タスクを追加"
      >
        <FontAwesomeIcon icon={faPlus} size="lg" />
      </button>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        editingTodo={editingTodo}
      />

      <DayTasksModal
        isOpen={showDayTasks}
        onClose={() => setShowDayTasks(false)}
        date={selectedDate || ''}
        todos={dayTodos}
        onToggle={toggleComplete}
        onEdit={(todo) => { handleEdit(todo); setShowDayTasks(false); }}
      />
    </div>
  );
};
