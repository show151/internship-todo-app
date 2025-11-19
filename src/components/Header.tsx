import { SearchBar } from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  uncompletedCount: number;
  onSettingsClick: () => void;
}

export const Header = ({ searchQuery, onSearchChange, uncompletedCount, onSettingsClick }: HeaderProps) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">TodoApp</h1>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
            未完了: {uncompletedCount}
          </div>
          <button
            onClick={onSettingsClick}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="設定"
          >
            <FontAwesomeIcon icon={faGear} className="text-gray-600 dark:text-gray-400" size="lg" />
          </button>
        </div>
      </div>
      <SearchBar value={searchQuery} onChange={onSearchChange} />
    </div>
  );
};
