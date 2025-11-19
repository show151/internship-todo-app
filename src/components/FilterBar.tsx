import type { FilterType, SortType } from '../types/todo';
import { twMerge } from 'tailwind-merge';

interface FilterBarProps {
  filter: FilterType;
  sort: SortType;
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
}

export const FilterBar = ({ filter, sort, onFilterChange, onSortChange }: FilterBarProps) => {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: '全て' },
    { value: 'active', label: '未着手' },
    { value: 'inProgress', label: '進行中' },
    { value: 'completed', label: '完了済' },
  ];

  const sorts: { value: SortType; label: string }[] = [
    { value: 'createdAt', label: '作成日' },
    { value: 'dueDate', label: '期限' },
  ];

  return (
    <div className="flex flex-wrap gap-4 rounded-lg border bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold dark:text-white">フィルタ:</span>
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={twMerge(
              'rounded px-3 py-1 text-sm font-medium transition-colors',
              filter === f.value
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold dark:text-white">並び替え:</span>
        {sorts.map(s => (
          <button
            key={s.value}
            onClick={() => onSortChange(s.value)}
            className={twMerge(
              'rounded px-3 py-1 text-sm font-medium transition-colors',
              sort === s.value
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
};
