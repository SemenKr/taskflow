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
import { CirclePlus, Trash2 } from 'lucide-react';
import { EditableTitle } from '@components/common/EditableTitle/EditableTitle.tsx';

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
  removeTodolist: (todolistId: string) => void;
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
  removeTodolist,
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

  const deleteTodolistModal = useEditModal(() => {
    removeTodolist(todolist.id);
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
      <Button
        className={styles.todoDeleteButton}
        onClick={() => deleteTodolistModal.open(null, '', 'confirm')}
        iconOnly
        variant="ghost-danger"
        size="sm"
        startIcon={<Trash2 />}
        aria-label="Delete todolist"
      />

      <div className={styles.todoTitle}>
        <EditableTitle
          title={todolist.title}
          onChange={onChangeTodolistHandler}
        />
      </div>

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

      {/* Modal для редактирования задачи */}
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

      {/* Modal для удаления всех задач */}
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

      {/* Modal для удаления тудулиста */}
      <Modal
        open={deleteTodolistModal.isOpen}
        onClose={deleteTodolistModal.close}
      >
        <ModalLayout
          title="Delete todolist"
          onCancel={deleteTodolistModal.close}
          onConfirm={deleteTodolistModal.apply}
          confirmText="Delete"
        >
          <p>Are you sure you want to delete "{todolist.title}"?</p>
          {tasks.length > 0 && (
            <p style={{ marginTop: '8px', color: 'var(--color-warning)' }}>
              This will also delete {tasks.length} task
              {tasks.length !== 1 ? 's' : ''}.
            </p>
          )}
        </ModalLayout>
      </Modal>
    </div>
  );
};
