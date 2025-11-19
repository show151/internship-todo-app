# TodoApp

React、TypeScript、Tailwind CSS を使用した高機能Todoアプリです。

## 特徴

- ✅ **完全な型安全性** - TypeScript による堅牢な型システム
- 🎨 **ダークモード対応** - 目に優しい表示切替（自動色調整）
- 📅 **カレンダービュー** - 月間カレンダーでタスク管理
- 🔔 **Web通知** - 期限前の自動リマインダー（エラーハンドリング対応）
- 🏷️ **タグ機能** - タスクの分類・整理（最大5個）
- 🔍 **高度な検索** - タイトル・詳細・タグで検索
- 📊 **統計情報** - タスクの進捗を可視化（未着手/進行中/完了）
- 💾 **データ管理** - エクスポート/インポート機能（安全な移行）
- 📱 **レスポンシブ** - モバイル・タブレット・PC対応
- 🚀 **高速動作** - LocalStorage による即座の保存
- 🎯 **進行中ステータス** - 未着手/進行中/完了の3段階管理
- 📝 **サブタスク機能** - タスクの細分化とプログレス表示
- ♿ **アクセシビリティ** - ARIA ラベル完全対応

## 技術スタック

- **フロントエンド**: React 18 + Vite
- **言語**: TypeScript 5（完全型安全）
- **スタイリング**: Tailwind CSS 4（ダークモード対応）
- **状態管理**: Context API + useReducer
- **アイコン**: Font Awesome
- **ストレージ**: LocalStorage API（自動移行機能付き）
- **通知**: Web Notifications API（エラーハンドリング）
- **アクセシビリティ**: ARIA 属性完全対応

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# デプロイ
npm run deploy
```

## 主要機能

### タスク管理
- タスクの追加・編集・削除
- 完了/未完了の切替
- 進行中ステータスの設定
- 優先度設定（低/中/高）
- 期限設定
- タグ付け（最大5個）
- 詳細説明
- サブタスク追加（無制限）
- サブタスクの進捗表示

### 表示機能
- リストビュー
- カレンダービュー
- 日付別タスク一覧表示
- フィルタ（全て/未着手/進行中/完了済）
- ソート（作成日/期限）
- 検索機能

### 設定
- ダークモード切替
- データエクスポート（JSON）
- データインポート（JSON）
- 全データリセット
- 統計情報表示

### 通知
- 期限1日前の自動通知
- ブラウザ通知対応

## 使い方

### 基本操作
1. **タスク追加**: 右下の「+」ボタンをクリック
2. **タスク編集**: タスクの鉛筆アイコン（✏️）をクリック
3. **完了切替**: チェックボックス（☑️）をクリック
4. **進行中設定**: 再生アイコン（▶️）をクリック（もう一度クリックで解除）
5. **削除**: ゴミ箱アイコン（🗑️）をクリック

### サブタスク
1. タスク追加/編集時に「サブタスク」セクションで追加
2. Enterキーまたは「+」ボタンで追加
3. リストビューで下矢印（▼）をクリックして展開
4. サブタスクのチェックボックスで完了管理
5. プログレスバーで進捗を確認（パーセント表示）
6. 無制限に追加可能

### フィルタ・検索
1. **未着手**: 進行中でも完了でもないタスク
2. **進行中**: 作業を開始したタスク
3. **完了済**: 完了したタスク
4. 検索バーでタイトル・詳細・タグを検索

### カレンダービュー
1. 右上の「カレンダー」ボタンで切替
2. 日付をクリックしてその日のタスク一覧を表示
3. ドットの色で完了/未完了を確認
   - 青色: 未完了/進行中
   - グレー: 完了済み
4. モーダル内でチェックボックスで完了切替
5. モーダルから直接タスク編集可能
6. 前月/次月ボタンで月を移動

### 設定画面
1. 右上の⚙️アイコンで設定画面へ
2. **ダークモード**: 🌙/☀️ボタンで切替（設定は自動保存）
3. **エクスポート**: タスクをJSON形式でダウンロード
4. **インポート**: JSONファイルからバックアップを復元
5. **統計情報**: 総タスク数、未着手、進行中、完了済みを表示
6. **リセット**: 全データを削除（確認ダイアログ付き）

## プロジェクト構成

```
src/
├── components/
│   ├── AddTaskModal.tsx      # タスク追加/編集モーダル
│   ├── CalendarView.tsx      # カレンダービュー
│   ├── DayTasksModal.tsx     # 日付別タスク表示
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

詳細は [IMPLEMENTATION.md](./IMPLEMENTATION.md) を参照してください。

## データ構造

```typescript
interface Todo {
  id: string;                    // UUID v4
  title: string;                 // 2-32文字
  description?: string;          // 任意
  dueDate?: string;              // YYYY-MM-DD形式
  completed: boolean;            // 完了フラグ
  inProgress: boolean;           // 進行中フラグ
  createdAt: string;             // ISO 8601形式
  tags?: string[];               // 最大5個、各10文字以内
  priority?: 'low' | 'medium' | 'high';
  subtasks?: Subtask[];          // 無制限
}

interface Subtask {
  id: string;                    // UUID v4
  title: string;                 // サブタスク名
  completed: boolean;            // 完了フラグ
}
```

### データ例
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "プロジェクト資料作成",
  "description": "Q1の報告書を作成する",
  "dueDate": "2025-01-20",
  "completed": false,
  "inProgress": true,
  "createdAt": "2025-01-15T10:30:00.000Z",
  "tags": ["仕事", "重要"],
  "priority": "high",
  "subtasks": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "title": "データ収集",
      "completed": true
    },
    {
      "id": "770e8400-e29b-41d4-a716-446655440002",
      "title": "グラフ作成",
      "completed": false
    }
  ]
}
```

## バリデーションルール

- **タイトル**: 必須、2-32文字
- **期限**: 今日以降の日付
- **タグ**: 最大5個、各10文字以内
- **優先度**: low/medium/high
- **サブタスク**: 無制限

## ステータス管理

| ステータス | 説明 | 表示 | 操作 |
|----------|------|------|------|
| 未着手 | 作業未開始 | 通常表示 | 初期状態 |
| 進行中 | 作業中 | 青色背景 + 「進行中」バッジ | ▶️アイコンをクリック |
| 完了 | 作業完了 | グレー + 取り消し線 | ☑️チェックボックスをクリック |

### ステータス遷移
```
未着手 → 進行中 → 完了
  ↓       ↓       ↓
  ←───────┴───────┘
（いつでも戻せます）
```

## キーボードショートカット

- **Enter**: モーダル内でタグ/サブタスク追加
- **Tab**: フォーカス移動
- **Space**: チェックボックス切替
- **Esc**: モーダルを閉じる（予定）

## アクセシビリティ

- ✅ すべてのボタンに`aria-label`属性
- ✅ キーボード操作完全対応
- ✅ スクリーンリーダー対応
- ✅ 適切なコントラスト比（WCAG AA準拠）
- ✅ フォーカス表示の最適化

## ブラウザ対応

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 技術的特徴

### データ移行の安全性
既存のLocalStorageデータを自動的に新しい形式に移行します。
```typescript
// 古いデータ → 新しいデータ
{ title: "タスク", completed: false }
↓
{ title: "タスク", completed: false, inProgress: false, subtasks: [] }
```

### エラーハンドリング
- 通知権限の状態管理
- ブラウザ非対応時の適切な処理
- データ読み込み失敗時のフォールバック
- 型安全なバリデーション

### パフォーマンス最適化
- `useMemo`でフィルタ・ソート結果をメモ化
- `useCallback`でイベントハンドラをメモ化
- 不要な再レンダリングを防止

## 将来実装予定

### Phase 4（認証・同期）
- 🔐 認証機能（Google/GitHub OAuth）
- ☁️ Supabase/Firebase 連携
- 🔄 リアルタイム同期
- 👥 マルチデバイス対応

### Phase 5（高度な機能）
- 🔁 タスクの繰り返し設定
- 🤝 共有機能（チーム協業）
- 🎯 ドラッグ&ドロップ並び替え
- 📎 添付ファイル機能
- 📧 メール通知
- 📈 詳細な分析ダッシュボード

## 開発履歴

### Phase 1: MVP（2025年1月15日）
- ✅ CRUD操作
- ✅ フィルタ・ソート・検索
- ✅ LocalStorage保存
- ✅ バリデーション

### Phase 2: 拡張機能（2025年1月15日）
- ✅ ダークモード
- ✅ 設定画面
- ✅ タグ機能
- ✅ 優先度設定
- ✅ 統計情報

### Phase 3: 高度な機能（2025年1月15日）
- ✅ カレンダービュー
- ✅ Web通知
- ✅ データインポート
- ✅ DB連携準備

### Phase 3.5: 品質向上（2025年1月15日）
- ✅ 進行中ステータス
- ✅ サブタスク機能
- ✅ 日付別タスク表示
- ✅ データ移行機能
- ✅ エラーハンドリング
- ✅ アクセシビリティ完全対応
- ✅ UI/UX改善（色調整）

## 謝辞

- [React](https://react.dev/) - UIライブラリ
- [Vite](https://vitejs.dev/) - ビルドツール
- [Tailwind CSS](https://tailwindcss.com/) - CSSフレームワーク
- [Font Awesome](https://fontawesome.com/) - アイコン

## ライセンス

MIT License

Copyright (c) 2025 Sho Kawano

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## トラブルシューティング

### 通知が表示されない
1. ブラウザの通知設定を確認
2. サイトの通知権限を許可
3. タスク追加時に権限リクエストを承認

### データが消えた
1. ブラウザのキャッシュをクリアしていないか確認
2. エクスポート機能で定期的にバックアップを推奨
3. LocalStorageの容量制限（約5-10MB）に注意

### ダークモードが反映されない
1. ページをリロード
2. ブラウザのキャッシュをクリア
3. LocalStorageの設定を確認

## パフォーマンス

- 想定タスク数: ~1,000件
- 初回ロード: <100ms
- フィルタ・検索: <50ms
- LocalStorage保存: <10ms

## セキュリティ

- XSS対策: React の自動エスケープ
- データ検証: TypeScript 型チェック + バリデーション
- ローカルストレージのみ使用（外部送信なし）

## 作者

**Sho Kawano**
- GitHub: [@show151](https://github.com/show151)
- プロジェクト: [internship-todo-app](https://github.com/show151/internship-todo-app)
- 作成時間: 30時間