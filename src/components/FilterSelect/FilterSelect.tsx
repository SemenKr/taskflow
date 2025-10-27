import { FilterType } from '@/types/todo.ts';
import { useEffect, useRef, useState } from 'react';
import styles from './FilterSelect.module.scss';

type FilterSelectProps = {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  tasksCount: number;
  activeCount: number;
  completedCount: number;
};

export const FilterSelect = ({
  filter,
  onFilterChange,
  tasksCount,
  activeCount,
  completedCount,
}: FilterSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const filters = [
    { key: 'all', label: 'All', count: tasksCount },
    { key: 'active', label: 'Active', count: activeCount },
    { key: 'completed', label: 'Completed', count: completedCount },
  ] as const;

  const selectedLabel = filters.find((f) => f.key === filter)?.label ?? 'All';

  const handleFilterChange = (newFilter: FilterType) => {
    onFilterChange(newFilter);
    setIsOpen(false);
  };

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!selectRef.current?.contains(e.target as Node)) setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className={styles.select} ref={selectRef}>
      <button
        className={styles.selectHeader}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.selectedValue}>{selectedLabel}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}>
          <svg width="8" height="4" viewBox="0 0 8 4" fill="none">
            <path
              d="M3.86926 3.5L0.500032 0.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.23846 0.5L3.86923 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        className={`${styles.selectOptions} ${isOpen ? styles.open : ''}`}
        role="listbox"
      >
        {filters.map(({ key, label, count }) => (
          <button
            key={key}
            className={styles.option}
            onClick={() => handleFilterChange(key)}
            type="button"
            role="option"
            aria-selected={filter === key}
          >
            <span>{label}</span>
            <span className={styles.counter}>{count}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
