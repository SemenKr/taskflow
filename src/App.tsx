import { Layout } from './components/Layout/Layout.tsx';
import { ReactNode, useState } from 'react';
import { v1 } from 'uuid';
import { ToDoList } from './components/todo/ToDoList/ToDoList.tsx';
import type { TasksStateType, TaskType, TodolistType } from './types/todo.ts';
import { AddButton } from '@components/common/AddButton/AddButton.tsx';
import { useEditModal } from '@/hooks/useEditModal.ts';
import { TextInput } from '@components/common/input/TextInput.tsx';
import { Modal } from '@components/common/Modal/Modal.tsx';
import { ModalLayout } from '@components/common/Modal/ModalLayout.tsx';

export function App() {
  const todolistId1 = v1() as string;
  const todolistId2 = v1() as string;

  const [todoLists, setTodoLists] = useState<TodolistType[]>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1() as string, title: 'HTML&CSS', isDone: true },
      { id: v1() as string, title: 'JS', isDone: true },
      { id: v1() as string, title: 'ReactJS', isDone: false },
      { id: v1() as string, title: 'Rest API', isDone: true },
      { id: v1() as string, title: 'GraphQL', isDone: false },
    ],
    [todolistId2]: [
      { id: v1() as string, title: 'Rest API', isDone: true },
      { id: v1() as string, title: 'GraphQL', isDone: false },
      { id: v1() as string, title: 'JS', isDone: true },
      { id: v1() as string, title: 'ReactJS', isDone: false },
    ],
  });

  const [isDark, setIsDark] = useState(false);
  const switchMode = () => setIsDark(!isDark);

  const addTask = (todolistId: string, taskTitle: string) => {
    const newTask = { id: v1(), title: taskTitle, isDone: false };
    setTasks((prev) => ({
      ...prev,
      [todolistId]: [newTask, ...tasks[todolistId]],
    }));
  };

  const deleteTask = (todolistId: string, taskId: string) => {
    setTasks((prev) => ({
      ...prev,
      [todolistId]: prev[todolistId].filter((task) => task.id !== taskId),
    }));
  };

  const deleteAllTasks = (todolistId: string) => {
    setTasks((prev) => ({ ...prev, [todolistId]: [] }));
    // setTasks([]);
  };

  const changeTaskTitle = (
    todolistId: string,
    taskId: string,
    taskTitle: string
  ) => {
    setTasks((prev) => ({
      ...prev,
      [todolistId]: prev[todolistId].map((task) =>
        task.id === taskId ? { ...task, title: taskTitle } : task
      ),
    }));
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    newIsDoneStatus: TaskType['isDone']
  ) => {
    setTasks((prev) => ({
      ...prev,
      [todolistId]: prev[todolistId].map((task) =>
        task.id === taskId ? { ...task, isDone: newIsDoneStatus } : task
      ),
    }));
  };

  const addTodoList = useEditModal((title) => {
    if (!title) return;
    const todolistId = v1() as string;
    const newTodolist: TodolistType = {
      id: todolistId,
      title: title,
      filter: 'all',
    };
    setTodoLists((prev) => [newTodolist, ...prev]);
    setTasks((prev) => ({ ...prev, [todolistId]: [] }));
  });

  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    setTodoLists((prev) =>
      prev.map((todolist) =>
        todolist.id === todolistId
          ? {
              ...todolist,
              title: newTitle,
            }
          : todolist
      )
    );
  };

  return (
    <Layout isDark={isDark} onToggleTheme={switchMode}>
      {todoLists.map(
        (todolist) =>
          (
            <ToDoList
              key={todolist.id}
              todolist={todolist}
              tasks={tasks[todolist.id]}
              deleteTask={deleteTask}
              deleteAllTasks={deleteAllTasks}
              addTask={addTask}
              changeTaskTitle={changeTaskTitle}
              changeTaskStatus={changeTaskStatus}
              changeTodolistTitle={changeTodolistTitle}
            />
          ) as ReactNode
      )}

      <AddButton onClick={() => addTodoList.open(null)} />

      <Modal open={addTodoList.isOpen} onClose={addTodoList.close}>
        <ModalLayout
          title={'Add todolist'}
          onCancel={addTodoList.close}
          onConfirm={addTodoList.apply}
          confirmText="Add"
          confirmDisabled={addTodoList.isApplyDisabled}
        >
          <TextInput
            value={addTodoList.value}
            onChange={addTodoList.changeHandler}
            onKeyDown={addTodoList.keyHandler}
            autoFocus
          />
        </ModalLayout>
      </Modal>
    </Layout>
  );
}
