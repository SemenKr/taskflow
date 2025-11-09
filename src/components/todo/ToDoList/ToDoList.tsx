import { useMemo, useRef, useState } from 'react';
import type { FilterType, Task } from '../../../types/todo.ts';
import styles from './ToDoList.module.scss';
import { SwitchToggle } from '../../common/SwitchToggle/SwitchToggle.tsx';
import { FilterSelect } from '@components/FilterSelect/FilterSelect.tsx';
import { TaskItem } from '@components/todo/ToDoList/TaskItem/TaskItem.tsx';
import { Image } from '@components/common/Image/Image.tsx';
import svgImage from '@/assets/icons/empty-tasks-list.svg';
import { TextInput } from '@components/TextInput';

type Props = {
  title: string;
  tasks: Task[];
  deleteTask: (taskId: string) => void;
  deleteAllTasks: () => void;
  addTask: (taskTitle: string) => void;
  switchMode: () => void;
  isDark: boolean;
  changeTaskStatus: (taskId: string, newIsDoneStatus: Task['isDone']) => void;
};

export const ToDoList = ({
  title,
  tasks,
  isDark,
  deleteTask,
  deleteAllTasks,
  addTask,
  switchMode,
  changeTaskStatus,
}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const activeCount = useMemo(
    () => tasks.filter((t) => !t.isDone).length,
    [tasks]
  );
  const completedCount = useMemo(
    () => tasks.filter((t) => t.isDone).length,
    [tasks]
  );

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter((t) => !t.isDone);
      case 'completed':
        return tasks.filter((t) => t.isDone);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const addTaskHandler = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    addTask(trimmedValue);
    setInputValue('');
    inputRef.current?.focus();
  };

  const eventInputHandler = (value: string) => {
    setInputValue(value);
  };

  return (
    <div className={styles.todo} data-theme={isDark ? 'dark' : 'light'}>
      <SwitchToggle onDarkHandler={switchMode} />
      <h3 className={styles.todoTitle}>{title}</h3>

      <div className={styles.todoInputWrapper}>
        <TextInput
          inputValue={inputValue}
          inputRef={inputRef}
          placeholder={'add new Task...'}
          eventInputHandler={eventInputHandler}
          onKeyDown={addTaskHandler}
        />
        <button
          className={styles.todoAddButton}
          onClick={addTaskHandler}
          aria-label="Add task"
          disabled={!inputValue.trim()}
        >
          +
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className={styles.emptyTaskWrapper}>
          <p className={styles.todoEmpty}>Тасок нет</p>
          <Image src={svgImage} width={221} height={174} isSvg={true} />
        </div>
      ) : (
        <ul className={styles.todoList}>
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={deleteTask}
              changeTaskStatus={changeTaskStatus}
            />
          ))}
        </ul>
      )}

      <div className={styles.buttonsWrapper}>
        <button
          className={styles.secondaryButton}
          onClick={deleteAllTasks}
          disabled={tasks.length === 0}
        >
          Delete All Tasks
        </button>
        <FilterSelect
          filter={filter}
          onFilterChange={setFilter}
          tasksCount={tasks.length}
          activeCount={activeCount}
          completedCount={completedCount}
        />
      </div>
    </div>
  );
};
