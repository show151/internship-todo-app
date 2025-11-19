import { useDarkMode } from '../hooks/useDarkMode';
import { useTodoContext } from '../context/TodoContext';
import { saveTodos } from '../utils/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

interface SettingsProps {
  onBack: () => void;
}

export const Settings = ({ onBack }: SettingsProps) => {
  const { isDark, toggleDarkMode } = useDarkMode();
  const { todos } = useTodoContext();

  const handleReset = () => {
    if (confirm('全てのデータを削除しますか？この操作は取り消せません。')) {
      saveTodos([]);
      window.location.reload();
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(todos, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          saveTodos(imported);
          window.location.reload();
        }
      } catch (error) {
        alert('ファイルの読み込みに失敗しました');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="mx-auto min-h-screen max-w-2xl p-4">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>戻る</span>
        </button>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">設定</h1>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">ダークモード</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                画面の表示テーマを切り替えます
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
              aria-label={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
            >
              <FontAwesomeIcon
                icon={isDark ? faSun : faMoon}
                className="text-gray-700 dark:text-yellow-400"
                size="lg"
              />
            </button>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">データ管理</h3>
          <div className="space-y-2">
            <button
              onClick={handleExport}
              className="w-full rounded bg-indigo-500 px-4 py-2 font-medium text-white hover:bg-indigo-600"
            >
              データをエクスポート
            </button>
            <label className="block w-full cursor-pointer rounded bg-green-500 px-4 py-2 text-center font-medium text-white hover:bg-green-600">
              データをインポート
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            <button
              onClick={handleReset}
              className="w-full rounded bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
            >
              全データをリセット
            </button>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">統計情報</h3>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <p>総タスク数: {todos.length}</p>
            <p>未着手: {todos.filter(t => !t.completed && !t.inProgress).length}</p>
            <p>進行中: {todos.filter(t => t.inProgress && !t.completed).length}</p>
            <p>完了済み: {todos.filter(t => t.completed).length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
