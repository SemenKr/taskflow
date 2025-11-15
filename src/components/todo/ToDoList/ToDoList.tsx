import { useMemo, useRef, useState } from 'react';
import type { FilterType, Task } from '@/types/todo.ts';
import styles from './ToDoList.module.scss';
import { FilterSelect } from '@components/FilterSelect/FilterSelect.tsx';
import { TaskItem } from '@components/todo/ToDoList/TaskItem/TaskItem.tsx';
import { Image } from '@/components/common/Image/Image.tsx';
import svgImage from '@/assets/icons/empty-tasks-list.svg';
import { Modal } from '@components/common/Modal/Modal.tsx';
import { Button } from '@components/common/Button/Button.tsx';

type Props = {
  title: string;
  tasks: Task[];
  deleteTask: (taskId: string) => void;
  deleteAllTasks: () => void;
  addTask: (taskTitle: string) => void;
  changeTaskStatus: (taskId: string, newIsDoneStatus: Task['isDone']) => void;
  changeTaskTitle: (taskId: string, taskTitle: string) => void;
};

export const ToDoList = ({
  title,
  tasks,
  deleteTask,
  deleteAllTasks,
  addTask,
  changeTaskStatus,
  changeTaskTitle,
}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [modalValue, setModalValue] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openModal = (title: string) => {
    if (title) {
      setModalValue(title);
    }
    setIsModalOpen(true);
  };

  return (
    <div className={styles.todo}>
      <h3 className={styles.todoTitle}>{title}</h3>

      <div className={styles.todoInputWrapper}>
        <input
          className={styles.todoInput}
          placeholder="add new Task..."
          value={inputValue}
          type="text"
          ref={inputRef}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTaskHandler()}
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
              changeTaskTitle={changeTaskTitle}
              openModal={openModal}
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
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className={styles.modalTitle}>NEW TASKS</h3>
        <input
          className={styles.modalInput}
          value={modalValue}
          onChange={(event) => setModalValue(event.currentTarget.value)}
        />
        <div className={styles.modalAction}>
          <Button onClick={() => setIsModalOpen(false)}>CANCEL</Button>
          <Button onClick={() => {}}>APPLY</Button>
        </div>
      </Modal>
    </div>
  );
};
