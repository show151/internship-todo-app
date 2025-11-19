import type { Todo } from '../types/todo';

const STORAGE_KEY = 'todo-app-ts-v1';

export const loadTodos = (): Todo[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const todos = JSON.parse(data);
    // データ移行: 古いデータに新しいフィールドを追加
    return todos.map((todo: any) => ({
      ...todo,
      inProgress: todo.inProgress ?? false,
      subtasks: todo.subtasks ?? [],
    }));
  } catch {
    return [];
  }
};

export const saveTodos = (todos: Todo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to save todos:', error);
  }
};
