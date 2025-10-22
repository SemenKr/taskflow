import type { Task } from '../../types/todo.ts';

type Props = {
  title: string;
  tasks: Task[];
  deleteTask: (taskId: string) => void;
  deleteAllTasks: () => void;
};

export const ToDoList = ({
  title,
  tasks,
  deleteTask,
  deleteAllTasks,
}: Props) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input type="text" />
        <button>+</button>
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={() => deleteTask(task.id)}>x</button>
              </li>
            );
          })}
        </ul>
      )}
      <button onClick={() => deleteAllTasks()}>Delete All Tasks</button>
    </div>
  );
};
