import type { Todo } from '../types/todo';

// Supabase連携用のアダプター（将来実装用）
export interface StorageAdapter {
  load: () => Promise<Todo[]>;
  save: (todos: Todo[]) => Promise<void>;
  sync?: () => Promise<void>;
}

export class LocalStorageAdapter implements StorageAdapter {
  private key = 'todo-app-ts-v1';

  async load(): Promise<Todo[]> {
    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  async save(todos: Todo[]): Promise<void> {
    try {
      localStorage.setItem(this.key, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos:', error);
    }
  }
}

// Supabase実装例（環境変数設定後に有効化）
export class SupabaseAdapter implements StorageAdapter {
  async load(): Promise<Todo[]> {
    // TODO: Supabase実装
    // const { data } = await supabase.from('todos').select('*');
    // return data || [];
    console.warn('Supabase not configured');
    return [];
  }

  async save(todos: Todo[]): Promise<void> {
    // TODO: Supabase実装
    // await supabase.from('todos').upsert(todos);
    console.warn('Supabase not configured');
  }

  async sync(): Promise<void> {
    // TODO: リアルタイム同期実装
    console.warn('Supabase sync not configured');
  }
}

// 環境変数で切り替え可能
export const getStorageAdapter = (): StorageAdapter => {
  const useSupabase = import.meta.env.VITE_USE_SUPABASE === 'true';
  return useSupabase ? new SupabaseAdapter() : new LocalStorageAdapter();
};
