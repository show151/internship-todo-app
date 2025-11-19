import type { Todo } from '../types/todo';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onUpdateSubtask?: (todoId: string, subtaskId: string, completed: boolean) => void;
}

export const TaskList = ({ todos, onToggle, onDelete, onEdit, onUpdateSubtask }: TaskListProps) => {
  if (todos.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500 dark:text-gray-400">
        タスクがありません
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map(todo => (
        <TaskItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onUpdateSubtask={onUpdateSubtask}
        />
      ))}
    </div>
  );
};
