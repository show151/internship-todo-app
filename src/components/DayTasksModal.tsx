import type { Todo } from '../types/todo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { twMerge } from 'tailwind-merge';

interface DayTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export const DayTasksModal = ({ isOpen, onClose, date, todos, onToggle, onEdit }: DayTasksModalProps) => {
  if (!isOpen) return null;

  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('ja-JP', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold dark:text-white">{formattedDate}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>

        {todos.length === 0 ? (
          <p className="py-8 text-center text-gray-500 dark:text-gray-400">
            この日のタスクはありません
          </p>
        ) : (
          <div className="max-h-96 space-y-2 overflow-y-auto">
            {todos.map(todo => (
              <div
                key={todo.id}
                className={twMerge(
                  'flex items-center gap-3 rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-900',
                  todo.completed && 'opacity-60',
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
                  <div className="mt-1 flex flex-wrap gap-2">
                    {todo.priority && (
                      <span className={twMerge(
                        'rounded px-2 py-0.5 text-xs font-semibold',
                        todo.priority === 'low' && 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                        todo.priority === 'medium' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
                        todo.priority === 'high' && 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      )}>
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
                <button
                  onClick={() => { onEdit(todo); onClose(); }}
                  className="rounded px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700"
                >
                  編集
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
