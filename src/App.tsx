import { Layout } from './components/Layout/Layout.tsx';
import { useState } from 'react';
import { v1 } from 'uuid';
import { ToDoList } from './components/todo/ToDoList/ToDoList.tsx';
import type { Task } from './types/todo.ts';
import { AddButton } from '@components/common/AddButton/AddButton.tsx';

export function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ]);

  const [isDark, setIsDark] = useState(false);

  const switchMode = () => {
    setIsDark(!isDark);
  };

  const addTask = (taskTitle: string) => {
    const newTask = { id: v1(), title: taskTitle, isDone: false };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (taskId: string) => {
    const filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });
    setTasks(filteredTasks);
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  const changeTaskTitle = (taskId: string, taskTitle: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, title: taskTitle } : task
      )
    );
  };

  const changeTaskStatus = (
    taskId: string,
    newIsDoneStatus: Task['isDone']
  ) => {
    const nextState: Task[] = tasks.map((task) =>
      task.id === taskId ? { ...task, isDone: newIsDoneStatus } : task
    );
    setTasks(nextState);
  };

  return (
    <Layout isDark={isDark} onToggleTheme={switchMode}>
      <ToDoList
        title={'What to learn'}
        tasks={tasks}
        deleteTask={deleteTask}
        deleteAllTasks={deleteAllTasks}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
      />
      <AddButton onClick={() => console.log('Here Will Be PopUp')} />
    </Layout>
  );
}
