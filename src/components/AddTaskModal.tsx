import { useState, useEffect } from 'react';
import type { Todo, Subtask } from '../types/todo';
import { validateTodo } from '../utils/validators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { twMerge } from 'tailwind-merge';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  editingTodo?: Todo;
}

export const AddTaskModal = ({ isOpen, onClose, onSave, editingTodo }: AddTaskModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [subtaskInput, setSubtaskInput] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description || '');
      setDueDate(editingTodo.dueDate || '');
      setPriority(editingTodo.priority || 'medium');
      setTags(editingTodo.tags || []);
      setSubtasks(editingTodo.subtasks || []);
    } else {
      resetForm();
    }
  }, [editingTodo, isOpen]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
    setTags([]);
    setTagInput('');
    setSubtasks([]);
    setSubtaskInput('');
    setErrors([]);
  };

  const handleSave = () => {
    const todo: Omit<Todo, 'id' | 'createdAt'> = {
      title,
      description: description || undefined,
      dueDate: dueDate || undefined,
      completed: editingTodo?.completed || false,
      inProgress: editingTodo?.inProgress || false,
      priority,
      tags: tags.length > 0 ? tags : undefined,
      subtasks: subtasks.length > 0 ? subtasks : undefined,
    };

    // 期限が設定されている場合、通知権限をリクエスト
    if (dueDate && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const validationErrors = validateTodo(todo);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(todo);
    resetForm();
    onClose();
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const addSubtask = () => {
    if (subtaskInput.trim()) {
      setSubtasks([...subtasks, { id: crypto.randomUUID(), title: subtaskInput.trim(), completed: false }]);
      setSubtaskInput('');
    }
  };

  const removeSubtask = (id: string) => {
    setSubtasks(subtasks.filter(s => s.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold dark:text-white">
            {editingTodo ? 'タスクを編集' : 'タスクを追加'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>

        {errors.length > 0 && (
          <div className="mb-4 rounded bg-red-50 p-3">
            {errors.map((error, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-red-600">
                <FontAwesomeIcon icon={faTriangleExclamation} />
                <span>{error}</span>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold dark:text-gray-300">タイトル *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="タスクのタイトル"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold dark:text-gray-300">詳細</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              rows={3}
              placeholder="タスクの詳細"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold dark:text-gray-300">期限</label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="w-full rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold dark:text-gray-300">優先度</label>
            <div className="flex gap-4">
              {(['low', 'medium', 'high'] as const).map(p => (
                <label key={p} className="flex items-center gap-2 dark:text-gray-300">
                  <input
                    type="radio"
                    checked={priority === p}
                    onChange={() => setPriority(p)}
                  />
                  <span>{p === 'low' ? '低' : p === 'medium' ? '中' : '高'}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold dark:text-gray-300">タグ (最大5個)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="タグを入力"
                maxLength={10}
                aria-label="タグ入力"
              />
              <button
                onClick={addTag}
                className="rounded bg-gray-200 px-4 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                disabled={tags.length >= 5}
                aria-label="タグを追加"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 rounded bg-gray-200 px-2 py-1 text-sm dark:bg-gray-700 dark:text-gray-300">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold dark:text-gray-300">サブタスク</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={subtaskInput}
                onChange={e => setSubtaskInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addSubtask())}
                className="flex-1 rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="サブタスクを入力"
                aria-label="サブタスク入力"
              />
              <button
                onClick={addSubtask}
                className="rounded bg-gray-200 px-4 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                aria-label="サブタスクを追加"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className="mt-2 space-y-1">
              {subtasks.map(subtask => (
                <div key={subtask.id} className="flex items-center justify-between rounded bg-gray-100 px-3 py-2 dark:bg-gray-700">
                  <span className="text-sm dark:text-gray-300">{subtask.title}</span>
                  <button onClick={() => removeSubtask(subtask.id)} className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2 font-medium hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            className={twMerge(
              'rounded bg-indigo-500 px-4 py-2 font-medium text-white hover:bg-indigo-600',
              errors.length > 0 && 'opacity-50'
            )}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};
