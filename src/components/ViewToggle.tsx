import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { twMerge } from 'tailwind-merge';

interface ViewToggleProps {
  view: 'list' | 'calendar';
  onViewChange: (view: 'list' | 'calendar') => void;
}

export const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex gap-2 rounded-lg border bg-white p-1 dark:border-gray-700 dark:bg-gray-800">
      <button
        onClick={() => onViewChange('list')}
        className={twMerge(
          'flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium transition-colors',
          view === 'list'
            ? 'bg-indigo-500 text-white'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
        )}
      >
        <FontAwesomeIcon icon={faList} />
        <span>リスト</span>
      </button>
      <button
        onClick={() => onViewChange('calendar')}
        className={twMerge(
          'flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium transition-colors',
          view === 'calendar'
            ? 'bg-indigo-500 text-white'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
        )}
      >
        <FontAwesomeIcon icon={faCalendar} />
        <span>カレンダー</span>
      </button>
    </div>
  );
};
