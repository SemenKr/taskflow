import { useMemo, useRef, useState } from 'react';
import type { FilterType, TaskType, TodolistType } from '@/types/todo.ts';
import styles from './ToDoList.module.scss';
import { FilterSelect } from '@components/FilterSelect/FilterSelect.tsx';
import { TaskItem } from '@components/todo/ToDoList/TaskItem/TaskItem.tsx';
import { Image } from '@/components/common/Image/Image.tsx';
import svgImage from '@/assets/icons/empty-tasks-list.svg';
import { Modal } from '@components/common/Modal/Modal.tsx';
import { Button } from '@components/common/Button/Button.tsx';
import { TextInput } from '@components/common/input/TextInput.tsx';
import { useEditModal } from '@/hooks/useEditModal.ts';

type Props = {
  todolist: TodolistType;
  tasks: TaskType[];
  deleteTask: (todolistId: string, taskId: string) => void;
  deleteAllTasks: (todolistId: string) => void;
  addTask: (todolistId: string, taskTitle: string) => void;
  changeTaskTitle: (
    todolistId: string,
    taskId: string,
    taskTitle: string
  ) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    newIsDoneStatus: TaskType['isDone']
  ) => void;
};

export const ToDoList = ({
  todolist,
  tasks,
  deleteTask,
  deleteAllTasks,
  addTask,
  changeTaskTitle,
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
    addTask(todolist.id, trimmedValue);
    setInputValue('');
    inputRef.current?.focus();
  };

  const deleteAllTasksHandler = () => {
    deleteAllTasks(todolist.id);
  };

  const modal = useEditModal((newTitle, taskId) => {
    if (taskId) {
      changeTaskTitle(todolist.id, taskId, newTitle);
    }
  });

  const openModal = (taskId: string, taskTitle: string) => {
    modal.open(taskId, taskTitle);
  };

  return (
    <div className={styles.todo}>
      <h3 className={styles.todoTitle}>{todolist.title}</h3>

      <div className={styles.todoInputWrapper}>
        <TextInput
          placeholder={'add new Task...'}
          value={inputValue}
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
              todolist={todolist}
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
        <Button
          variant="default"
          onClick={deleteAllTasksHandler}
          disabled={tasks.length === 0}
        >
          Delete All Tasks
        </Button>
        <FilterSelect
          filter={filter}
          onFilterChange={setFilter}
          tasksCount={tasks.length}
          activeCount={activeCount}
          completedCount={completedCount}
        />
      </div>
      <Modal title={'Edit Task'} open={modal.isOpen} onClose={modal.close}>
        <TextInput
          value={modal.value}
          onChange={modal.changeHandler}
          onKeyDown={modal.keyHandler}
          autoFocus
        />
        <div className={styles.modalAction}>
          <Button onClick={modal.close}>CANCEL</Button>
          <Button onClick={modal.apply} disabled={modal.isApplyDisabled}>
            APPLY
          </Button>
        </div>
      </Modal>
    </div>
  );
};
