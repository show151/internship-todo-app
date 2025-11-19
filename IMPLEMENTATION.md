# TodoApp 実装ドキュメント

## 実装完了機能

### Phase 1: MVP（コア機能）
✅ **型定義システム**
- `types/todo.ts` - 完全な型安全性
- Todo, FilterType, SortType, TodoState, TodoActions

✅ **状態管理**
- Context API + useReducer
- LocalStorage自動同期
- カスタムフック（useTodos）

✅ **CRUD操作**
- タスク追加・編集・削除
- 完了/未完了トグル
- バリデーション機能

✅ **UI コンポーネント**
- TaskItem - 個別タスク表示
- TaskList - タスク一覧
- AddTaskModal - 追加/編集モーダル
- Header - ヘッダー
- SearchBar - 検索バー
- FilterBar - フィルタ・ソート

### Phase 2: 拡張機能
✅ **ダークモード**
- useDarkMode カスタムフック
- LocalStorage で設定永続化
- 全コンポーネント対応

✅ **設定画面**
- ダークモード切替
- データエクスポート（JSON）
- データインポート（JSON）
- 全データリセット
- 統計情報表示

✅ **フィルタ・ソート・検索**
- フィルタ: 全て/未完了/完了済
- ソート: 作成日/期限
- 検索: タイトル・詳細・タグ

✅ **タグ機能**
- 最大5個まで
- 10文字以内
- 検索対応

✅ **優先度設定**
- 低/中/高
- 色分け表示

### Phase 3: 高度な機能
✅ **カレンダービュー**
- 月間カレンダー表示
- 日付ごとのタスク表示
- 日付クリックでタスク追加

✅ **Web通知**
- 期限1日前の通知
- 通知権限リクエスト
- 1時間ごとのチェック

✅ **ビュー切替**
- リストビュー
- カレンダービュー

✅ **データ管理**
- JSONエクスポート
- JSONインポート
- バックアップ機能

✅ **将来実装の準備**
- Supabase アダプターパターン
- Firebase 対応準備
- 環境変数設定

## ディレクトリ構成

```
src/
├── components/
│   ├── AddTaskModal.tsx      # タスク追加/編集モーダル
│   ├── CalendarView.tsx      # カレンダービュー
│   ├── FilterBar.tsx         # フィルタ・ソート
│   ├── Header.tsx            # ヘッダー
│   ├── SearchBar.tsx         # 検索バー
│   ├── TaskItem.tsx          # 個別タスク
│   ├── TaskList.tsx          # タスク一覧
│   └── ViewToggle.tsx        # ビュー切替
│
├── context/
│   └── TodoContext.tsx       # Context API + Reducer
│
├── hooks/
│   ├── useDarkMode.ts        # ダークモード管理
│   ├── useNotification.ts    # Web通知
│   └── useTodos.ts           # Todo統合ロジック
│
├── pages/
│   ├── Home.tsx              # メイン画面
│   └── Settings.tsx          # 設定画面
│
├── types/
│   └── todo.ts               # 型定義
│
├── utils/
│   ├── dateUtils.ts          # 日付ユーティリティ
│   ├── storage.ts            # LocalStorage操作
│   ├── supabaseAdapter.ts    # DB連携アダプター
│   └── validators.ts         # バリデーション
│
├── App.tsx                   # ルート
├── main.tsx                  # エントリーポイント
└── index.css                 # グローバルスタイル
```

## 技術スタック

- **フレームワーク**: React 18 + Vite
- **言語**: TypeScript 5
- **スタイリング**: Tailwind CSS 4
- **状態管理**: Context API + useReducer
- **アイコン**: Font Awesome
- **日付処理**: ネイティブ Date API
- **UUID**: crypto.randomUUID()

## 使用方法

### 開発サーバー起動
```bash
npm run dev
```

### ビルド
```bash
npm run build
```

### デプロイ
```bash
npm run deploy
```

## 主要機能の使い方

### タスク管理
1. 右下の「+」ボタンでタスク追加
2. タスクをクリックして編集
3. チェックボックスで完了/未完了切替
4. ゴミ箱アイコンで削除

### フィルタ・検索
1. 上部のフィルタボタンで表示切替
2. 検索バーでタスク検索
3. 並び替えボタンでソート

### カレンダービュー
1. 右上の「カレンダー」ボタンで切替
2. 日付をクリックしてタスク追加
3. ドットでタスク数を表示

### 設定
1. 右上の⚙️アイコンで設定画面
2. ダークモード切替
3. データのエクスポート/インポート
4. 統計情報確認

### 通知
1. タスク追加時に通知権限を許可
2. 期限1日前に自動通知
3. ブラウザ通知で表示

## 将来実装予定

### 認証機能
- Google OAuth
- GitHub OAuth
- メールアドレス認証

### データベース連携
- Supabase 統合
- Firebase 統合
- リアルタイム同期

### 追加機能
- タスクの並び替え（ドラッグ&ドロップ）
- サブタスク機能
- タスクの繰り返し設定
- 添付ファイル機能
- コメント機能
- 共有機能

## バリデーションルール

- **タイトル**: 必須、2-32文字
- **期限**: 今日以降の日付
- **タグ**: 最大5個、各10文字以内
- **優先度**: low/medium/high

## LocalStorage構造

```json
{
  "todo-app-ts-v1": [
    {
      "id": "uuid",
      "title": "タスク名",
      "description": "詳細",
      "dueDate": "2025-01-20",
      "completed": false,
      "createdAt": "2025-01-15T10:30:00.000Z",
      "tags": ["タグ1", "タグ2"],
      "priority": "high"
    }
  ],
  "darkMode": true
}
```

## パフォーマンス最適化

- useMemo でフィルタ・ソート結果をメモ化
- useCallback でイベントハンドラをメモ化
- 仮想スクロール不要（想定タスク数: ~1000）

## アクセシビリティ

- ARIA ラベル対応
- キーボード操作対応
- スクリーンリーダー対応
- コントラスト比確保

## ブラウザ対応

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## ライセンス

MIT License - 詳細は README.md を参照
