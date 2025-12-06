import { Layout } from './components/Layout/Layout.tsx';
import { ReactNode, useState } from 'react';
import { ToDoList } from './components/todo/ToDoList/ToDoList.tsx';
import { AddButton } from '@components/common/AddButton/AddButton.tsx';
import { useEditModal } from '@/hooks/useEditModal.ts';
import { TextInput } from '@components/common/input/TextInput.tsx';
import { Modal } from '@components/common/Modal/Modal.tsx';
import { ModalLayout } from '@components/common/Modal/ModalLayout.tsx';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  addTodolist,
  removeTodolist,
  changeTodolistTitle,
} from '@/app/store/slices/todolistsSlice';
import {
  addTask,
  removeTask,
  removeAllTasks,
  changeTaskTitle,
  changeTaskStatus,
} from '@/app/store/slices/tasksSlice';

export function App() {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector((state) => state.todolists);
  const tasks = useAppSelector((state) => state.tasks);

  const [isDark, setIsDark] = useState(false);
  const switchMode = () => setIsDark(!isDark);

  const handleAddTask = (todolistId: string, taskTitle: string) => {
    dispatch(addTask({ todolistId, title: taskTitle }));
  };

  const handleDeleteTask = (todolistId: string, taskId: string) => {
    dispatch(removeTask({ todolistId, taskId }));
  };

  const handleDeleteAllTasks = (todolistId: string) => {
    dispatch(removeAllTasks(todolistId));
  };

  const handleChangeTaskTitle = (
    todolistId: string,
    taskId: string,
    taskTitle: string
  ) => {
    dispatch(changeTaskTitle({ todolistId, taskId, title: taskTitle }));
  };

  const handleChangeTaskStatus = (
    todolistId: string,
    taskId: string,
    newIsDoneStatus: boolean
  ) => {
    dispatch(changeTaskStatus({ todolistId, taskId, isDone: newIsDoneStatus }));
  };

  const addTodolistModal = useEditModal((title) => {
    if (!title) return;
    dispatch(addTodolist(title));
  });

  const handleChangeTodolistTitle = (todolistId: string, newTitle: string) => {
    dispatch(changeTodolistTitle({ todolistId, title: newTitle }));
  };

  const handleRemoveTodolist = (todolistId: string) => {
    dispatch(removeTodolist(todolistId));
  };

  return (
    <Layout isDark={isDark} onToggleTheme={switchMode}>
      {todolists.map(
        (todolist) =>
          (
            <ToDoList
              key={todolist.id}
              todolist={todolist}
              tasks={tasks[todolist.id] || []}
              deleteTask={handleDeleteTask}
              deleteAllTasks={handleDeleteAllTasks}
              addTask={handleAddTask}
              changeTaskTitle={handleChangeTaskTitle}
              changeTaskStatus={handleChangeTaskStatus}
              changeTodolistTitle={handleChangeTodolistTitle}
              removeTodolist={handleRemoveTodolist}
            />
          ) as ReactNode
      )}

      <AddButton onClick={() => addTodolistModal.open(null)} />

      <Modal open={addTodolistModal.isOpen} onClose={addTodolistModal.close}>
        <ModalLayout
          title={'Add todolist'}
          onCancel={addTodolistModal.close}
          onConfirm={addTodolistModal.apply}
          confirmText="Add"
          confirmDisabled={addTodolistModal.isApplyDisabled}
        >
          <TextInput
            value={addTodolistModal.value}
            onChange={addTodolistModal.changeHandler}
            onKeyDown={addTodolistModal.keyHandler}
            autoFocus
          />
        </ModalLayout>
      </Modal>
    </Layout>
  );
}
