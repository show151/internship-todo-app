export interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // YYYY-MM-DD
  completed: boolean;
  inProgress: boolean;
  createdAt: string; // ISO 8601
  tags?: string[];
  priority?: 'low' | 'medium' | 'high';
  subtasks?: Subtask[];
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export type FilterType = 'all' | 'active' | 'inProgress' | 'completed';
export type SortType = 'dueDate' | 'createdAt';

export interface TodoState {
  todos: Todo[];
  filter: FilterType;
  sort: SortType;
  searchQuery: string;
}

export interface TodoActions {
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  updateTodo: (id: string, updated: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
  setFilter: (filter: FilterType) => void;
  setSort: (sort: SortType) => void;
  setSearchQuery: (query: string) => void;
}

export interface UseTodosReturn extends TodoState, TodoActions {}
