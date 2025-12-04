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
import { ModalLayout } from '@components/common/Modal/ModalLayout.tsx';
import { EditableTaskTitle } from '@components/todo/ToDoList/EditableTaskTitle/EditableTaskTitle.tsx';
import { CirclePlus } from 'lucide-react';

type Props = {
  todolist: TodolistType;
  tasks: TaskType[];
  deleteTask: (todolistId: string, taskId: string) => void;
  deleteAllTasks: (todolistId: string) => void;
  addTask: (todolistId: string, taskTitle: string) => void;
  changeTaskTitle: (
    todolistId: string,
    taskId: string,
    NewTaskTitle: string
  ) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    newIsDoneStatus: TaskType['isDone']
  ) => void;
  changeTodolistTitle: (todolistId: string, newTodolistTitle: string) => void;
};

export const ToDoList = ({
  todolist,
  tasks,
  deleteTask,
  deleteAllTasks,
  addTask,
  changeTaskTitle,
  changeTaskStatus,
  changeTodolistTitle,
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

  const deleteAllModal = useEditModal(() => {
    deleteAllTasks(todolist.id);
  });

  const EditModal = useEditModal((newTitle, taskId) => {
    if (taskId && newTitle !== undefined) {
      changeTaskTitle(todolist.id, taskId, newTitle);
    }
  });

  const openModal = (taskId: string, taskTitle: string) => {
    EditModal.open(taskId, taskTitle);
  };

  const onChangeTodolistHandler = (newTodolistTitle: string) => {
    changeTodolistTitle(todolist.id, newTodolistTitle);
  };

  return (
    <div className={styles.todo}>
      <h3 className={styles.todoTitle}>
        <EditableTaskTitle
          title={todolist.title}
          onChange={onChangeTodolistHandler}
        />
      </h3>

      <div className={styles.todoInputWrapper}>
        <TextInput
          placeholder={'add new Task...'}
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTaskHandler()}
        />
        <Button
          className={styles.todoAddButton}
          onClick={addTaskHandler}
          iconOnly
          variant="ghost"
          size="lg"
          startIcon={<CirclePlus />}
          aria-label="Add task"
          disabled={!inputValue.trim()}
        />
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
          onClick={() => deleteAllModal.open(null, '', 'confirm')}
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
      <Modal open={EditModal.isOpen} onClose={EditModal.close}>
        <ModalLayout
          title={'Edit task'}
          onCancel={EditModal.close}
          onConfirm={EditModal.apply}
          confirmText="Apply"
          confirmDisabled={EditModal.isApplyDisabled}
        >
          <TextInput
            value={EditModal.value}
            onChange={EditModal.changeHandler}
            onKeyDown={EditModal.keyHandler}
            autoFocus
          />
        </ModalLayout>
      </Modal>

      <Modal open={deleteAllModal.isOpen} onClose={deleteAllModal.close}>
        <ModalLayout
          title="Delete all tasks"
          onCancel={deleteAllModal.close}
          onConfirm={deleteAllModal.apply}
          confirmText="Delete"
        >
          <p>Are you sure you want to delete all tasks?</p>
        </ModalLayout>
      </Modal>
    </div>
  );
};
