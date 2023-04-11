import { useTodoStore } from "../../models/hoxTodo";
import styles from '../../layouts/index.less';
import { TodoType } from '../../common/types';

interface TodoItemProps {
  todo: TodoType;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo } = useTodoStore();
  
  return (
    <li className={styles['todo-item']} onClick={() => toggleTodo(todo.id)}>
      {todo && todo.completed ? "👌" : "👋"}{" "}
      <span
        className={styles[`todo-item__text${todo && todo.completed ? '--completed' : ''}`]}
      >
        {todo.content}
      </span>
    </li>
  );
}
