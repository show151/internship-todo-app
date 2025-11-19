import type { Todo } from '../types/todo';

export const validateTodo = (todo: Partial<Todo>): string[] => {
  const errors: string[] = [];

  if (!todo.title?.trim()) {
    errors.push('タイトルは必須です');
  }

  if (todo.title && (todo.title.length < 2 || todo.title.length > 32)) {
    errors.push('タイトルは2文字以上、32文字以内で入力してください');
  }

  if (todo.dueDate) {
    const due = new Date(todo.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (due < today) {
      errors.push('期限は今日以降の日付を指定してください');
    }
  }

  if (todo.tags && todo.tags.length > 5) {
    errors.push('タグは最大5個までです');
  }

  if (todo.tags?.some(tag => tag.length > 10)) {
    errors.push('タグは10文字以内にしてください');
  }

  return errors;
};
