export function App() {
  // const [filter, setFilter] = useState<FilterValues>('all');
  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ]);
  console.log(setTasks);

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
      />
    </Layout>
  );
}
