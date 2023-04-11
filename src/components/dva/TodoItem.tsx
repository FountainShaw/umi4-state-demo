import { useDispatch } from 'umi';
import { ActionType, createAction } from '../../models/dvaTodo';
import styles from '../../layouts/index.less';
import { TodoType } from '../../common/types';

interface TodoItemProps {
  todo: TodoType;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();

  function onItemHandle() {
    dispatch(createAction(ActionType.toggleTodo)({ id: todo.id }));
  }
  
  return (
    <li className={styles['todo-item']} onClick={onItemHandle}>
      {todo && todo.completed ? "👌" : "👋"}{" "}
      <span
        className={styles[`todo-item__text${todo && todo.completed ? '--completed' : ''}`]}
      >
        {todo.content}
      </span>
    </li>
  );
}
