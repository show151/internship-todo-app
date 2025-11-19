import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
      />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="タスクを検索..."
        className="w-full rounded-lg border py-2 pl-10 pr-4 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
      />
    </div>
  );
};
