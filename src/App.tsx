import { Layout } from './components/Layout/Layout.tsx';
import { useState } from 'react';
import { v1 } from 'uuid';
import { ToDoList } from './components/ToDoList/ToDoList.tsx';
import type { Task } from './types/todo.ts';

export function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ]);

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

  return (
    <Layout>
      <p>Старт разработки...</p>
      <ToDoList
        title={'What to learn'}
        tasks={tasks}
        deleteTask={deleteTask}
        deleteAllTasks={deleteAllTasks}
        addTask={addTask}
      />
    </Layout>
  );
}
