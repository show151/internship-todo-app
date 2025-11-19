import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { Todo, TodoState, TodoActions, FilterType, SortType } from '../types/todo';
import { loadTodos, saveTodos } from '../utils/storage';

type Action =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'UPDATE_TODO'; payload: { id: string; updated: Partial<Todo> } }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'TOGGLE_COMPLETE'; payload: string }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'SET_SORT'; payload: SortType }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'LOAD_TODOS'; payload: Todo[] };

const initialState: TodoState = {
  todos: [],
  filter: 'all',
  sort: 'createdAt',
  searchQuery: '',
};

const todoReducer = (state: TodoState, action: Action): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload.updated } : t
        ),
      };
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter(t => t.id !== action.payload) };
    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'LOAD_TODOS':
      return { ...state, todos: action.payload };
    default:
      return state;
  }
};

const TodoContext = createContext<(TodoState & TodoActions) | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const todos = loadTodos();
    dispatch({ type: 'LOAD_TODOS', payload: todos });
  }, []);

  useEffect(() => {
    if (state.todos.length > 0 || loadTodos().length > 0) {
      saveTodos(state.todos);
    }
  }, [state.todos]);

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      inProgress: todo.inProgress ?? false,
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  };

  const updateTodo = (id: string, updated: Partial<Todo>) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, updated } });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const toggleComplete = (id: string) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: id });
  };

  const setFilter = (filter: FilterType) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSort = (sort: SortType) => {
    dispatch({ type: 'SET_SORT', payload: sort });
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH', payload: query });
  };

  return (
    <TodoContext.Provider
      value={{
        ...state,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
        setFilter,
        setSort,
        setSearchQuery,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within TodoProvider');
  }
  return context;
};
