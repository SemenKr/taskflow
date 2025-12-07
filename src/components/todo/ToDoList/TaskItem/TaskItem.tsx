import styles from './TaskItem.module.scss';
import { TaskType, TodolistType } from '@/types/todo.ts';
import { Icon } from '@components/common/Icon/Icon.tsx';
import { Button } from '@components/common/Button/Button.tsx';
import { ReactNode } from 'react';
import { Modal } from '@components/common/Modal/Modal.tsx';
import { useEditModal } from '@/hooks/useEditModal.ts';
import { ModalLayout } from '@components/common/Modal/ModalLayout.tsx';
import { EditableTitle } from '@components/common/EditableTitle/EditableTitle.tsx';

type TaskItemProps = {
  todolist: TodolistType;
  task: TaskType;
  onDelete: (todolistId: string, id: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    newIsDoneStatus: TaskType['isDone']
  ) => void;
  changeTaskTitle: (
    todolistId: string,
    taskId: string,
    newTaskTitle: string
  ) => void;
  openModal: (taskId: string, taskTitle: string) => void;
};

export const TaskItem = ({
  todolist,
  task,
  onDelete,
  changeTaskStatus,
  changeTaskTitle,
  openModal,
}: TaskItemProps) => {
  const onChangeTaskHandler = (newTaskTitle: string) => {
    changeTaskTitle(todolist.id, task.id, newTaskTitle);
  };

  const onEditHandler = () => {
    openModal(task.id, task.title);
  };

  const deleteModal = useEditModal(() => {
    onDelete(todolist.id, task.id);
  });

  return (
    <li className={styles.todoItem}>
      <input
        className={styles.todoCheckbox}
        type="checkbox"
        id={`task-${task.id}`}
        checked={task.isDone}
        onChange={(e) =>
          changeTaskStatus(todolist.id, task.id, e.currentTarget.checked)
        }
      />
      <EditableTitle title={task.title} onChange={onChangeTaskHandler} />
      <div className={styles.todoIcons}>
        <Button
          onClick={onEditHandler}
          aria-label={`Edit ${task.title}`}
          startIcon={
            (
              <Icon
                name="edit"
                size="14"
                color="#CDCDCD"
                hoverColor="#6C63FF"
              />
            ) as ReactNode
          }
          iconOnly
          variant="ghost"
        />
        <Button
          onClick={() => deleteModal.open(task.id, '', 'confirm')}
          aria-label={`Delete ${task.title}`}
          startIcon={
            (
              <Icon
                name="delete"
                size="16"
                color="#CDCDCD"
                hoverColor="#E50000"
              />
            ) as ReactNode
          }
          iconOnly
          variant="ghost-danger"
        />
      </div>
      <Modal open={deleteModal.isOpen} onClose={deleteModal.close}>
        <ModalLayout
          title="Delete task"
          onCancel={deleteModal.close}
          onConfirm={deleteModal.apply}
          confirmText="Delete"
        >
          <p>
            Are you sure you want to delete this task &quot;{task.title}&quot;?
          </p>
        </ModalLayout>
      </Modal>
    </li>
  );
};
