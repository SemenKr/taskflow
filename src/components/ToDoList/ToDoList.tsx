import { Task } from '../../types/todo.ts';

type Props = {
  title: string;
  tasks: Task[];
};

export const ToDoList = ({ title, tasks }: Props) => {
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
                <button>x</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
