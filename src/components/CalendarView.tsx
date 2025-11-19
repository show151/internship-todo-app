import { useState } from 'react';
import type { Todo } from '../types/todo';
import { getMonthDays, isSameDay, formatDate } from '../utils/dateUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { twMerge } from 'tailwind-merge';

interface CalendarViewProps {
  todos: Todo[];
  onDateClick: (date: string) => void;
}

export const CalendarView = ({ todos, onDateClick }: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = getMonthDays(year, month);
  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

  const getTodosForDate = (date: Date) => {
    return todos.filter(
      todo => todo.dueDate && isSameDay(new Date(todo.dueDate), date)
    );
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  return (
    <div className="rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="dark:text-white" />
        </button>
        <h2 className="text-xl font-bold dark:text-white">
          {year}年 {month + 1}月
        </h2>
        <button
          onClick={nextMonth}
          className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FontAwesomeIcon icon={faChevronRight} className="dark:text-white" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div
            key={day}
            className="p-2 text-center text-sm font-semibold text-gray-600 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const isCurrentMonth = day.getMonth() === month;
          const isToday = isSameDay(day, new Date());
          const dayTodos = getTodosForDate(day);

          return (
            <button
              key={index}
              onClick={() => onDateClick(formatDate(day))}
              className={twMerge(
                'min-h-16 rounded p-2 text-sm transition-colors',
                isCurrentMonth
                  ? 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700'
                  : 'bg-gray-50 text-gray-400 dark:bg-gray-900 dark:text-gray-600',
                isToday && 'ring-2 ring-indigo-500'
              )}
            >
              <div className={twMerge('font-semibold', isToday && 'text-indigo-600 dark:text-indigo-400', !isCurrentMonth && 'text-gray-400 dark:text-gray-600', isCurrentMonth && 'dark:text-white')}>
                {day.getDate()}
              </div>
              {dayTodos.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {dayTodos.slice(0, 2).map(todo => (
                    <div
                      key={todo.id}
                      className={twMerge(
                        'h-1.5 w-1.5 rounded-full',
                        todo.completed ? 'bg-gray-400' : 'bg-indigo-500'
                      )}
                    />
                  ))}
                  {dayTodos.length > 2 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">+{dayTodos.length - 2}</span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
