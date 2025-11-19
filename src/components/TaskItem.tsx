import { useState } from 'react';
import type { Todo, Subtask } from '../types/todo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil, faPlay, faCheck, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { twMerge } from 'tailwind-merge';

interface TaskItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onUpdateSubtask?: (todoId: string, subtaskId: string, completed: boolean) => void;
}

export const TaskItem = ({ todo, onToggle, onDelete, onEdit, onUpdateSubtask }: TaskItemProps) => {
  const [showSubtasks, setShowSubtasks] = useState(false);
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;
  const isDueToday = todo.dueDate && new Date(todo.dueDate).toDateString() === new Date().toDateString();
  
  const completedSubtasks = todo.subtasks?.filter(s => s.completed).length || 0;
  const totalSubtasks = todo.subtasks?.length || 0;
  const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const handleInProgressToggle = () => {
    onEdit({ ...todo, inProgress: !todo.inProgress });
  };

  return (
    <div className="space-y-2">
      <div
        className={twMerge(
          'flex items-center gap-3 rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-800',
          isOverdue && 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950',
          isDueToday && 'border-yellow-300 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950',
          todo.completed && 'bg-gray-50 opacity-60 dark:bg-gray-900',
          todo.inProgress && !todo.completed && 'border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950'
        )}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-5 w-5 cursor-pointer"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={twMerge('font-semibold dark:text-white', todo.completed && 'line-through text-gray-500 dark:text-gray-500')}>
              {todo.title}
            </h3>
            {todo.inProgress && !todo.completed && (
              <span className="rounded bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
                進行中
              </span>
            )}
          </div>
          {todo.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400">{todo.description}</p>
          )}
          {totalSubtasks > 0 && (
            <div className="mt-2">
              <div className="mb-1 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>サブタスク: {completedSubtasks}/{totalSubtasks}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-2 rounded-full bg-indigo-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
          <div className="mt-1 flex flex-wrap gap-2">
          {todo.dueDate && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              期限: {new Date(todo.dueDate).toLocaleDateString('ja-JP')}
            </span>
          )}
          {todo.priority && (
            <span className={twMerge('rounded px-2 py-0.5 text-xs font-semibold', priorityColors[todo.priority])}>
              {todo.priority === 'low' ? '低' : todo.priority === 'medium' ? '中' : '高'}
            </span>
          )}
            {todo.tags?.map(tag => (
              <span key={tag} className="rounded bg-gray-200 px-2 py-0.5 text-xs dark:bg-gray-700 dark:text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
        {totalSubtasks > 0 && (
          <button
            onClick={() => setShowSubtasks(!showSubtasks)}
            className="rounded p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label={showSubtasks ? 'サブタスクを隠す' : 'サブタスクを表示'}
          >
            <FontAwesomeIcon icon={showSubtasks ? faChevronUp : faChevronDown} />
          </button>
        )}
        <button
          onClick={handleInProgressToggle}
          className={twMerge(
            'rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700',
            todo.inProgress ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
          )}
          aria-label="進行中にする"
          title={todo.inProgress ? '進行中を解除' : '進行中にする'}
        >
          <FontAwesomeIcon icon={todo.inProgress ? faCheck : faPlay} />
        </button>
        <button
          onClick={() => onEdit(todo)}
          className="rounded p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700"
          aria-label="編集"
        >
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="rounded p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700"
          aria-label="削除"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      {showSubtasks && totalSubtasks > 0 && (
        <div className="ml-12 space-y-1 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900">
          {todo.subtasks?.map(subtask => (
            <div key={subtask.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => onUpdateSubtask?.(todo.id, subtask.id, !subtask.completed)}
                className="h-4 w-4 cursor-pointer"
              />
              <span className={twMerge('text-sm dark:text-gray-300', subtask.completed && 'line-through text-gray-500 dark:text-gray-500')}>
                {subtask.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
