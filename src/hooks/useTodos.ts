import { useMemo } from 'react';
import { useTodoContext } from '../context/TodoContext';
import type { Todo } from '../types/todo';

export const useTodos = () => {
  const context = useTodoContext();

  const filteredAndSortedTodos = useMemo(() => {
    let result = [...context.todos];

    // フィルタリング
    if (context.filter === 'active') {
      result = result.filter(t => !t.completed && !t.inProgress);
    } else if (context.filter === 'inProgress') {
      result = result.filter(t => t.inProgress && !t.completed);
    } else if (context.filter === 'completed') {
      result = result.filter(t => t.completed);
    }

    // 検索
    if (context.searchQuery) {
      const query = context.searchQuery.toLowerCase();
      result = result.filter(
        t =>
          t.title.toLowerCase().includes(query) ||
          t.description?.toLowerCase().includes(query) ||
          t.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // ソート
    result.sort((a, b) => {
      if (context.sort === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return result;
  }, [context.todos, context.filter, context.searchQuery, context.sort]);

  return {
    ...context,
    todos: filteredAndSortedTodos,
  };
};
