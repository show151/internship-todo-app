import type { Todo } from "./types";
import { v4 as uuid } from "uuid";

export const initTodos: Todo[] = [
    {
        id: uuid(),
        name: "基本情報技術者試験",
        isDone: false,
        priority: 2,
        deadline: new Date(2025, 11, 31),
    },
    {
        id: uuid(),
        name: "Azure Fundamentals",
        isDone: false,
        priority: 1,
        deadline: null,
    },
    {
        id: uuid(),
        name: "ポートフォリオ",
        isDone: true,
        priority: 3,
        deadline: new Date(2024, 11, 31, 23, 59),
    },
];