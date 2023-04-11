import { useTodo } from '../../models/zustandTodo';
import TodoItem from "./TodoItem";
import styles from '../../layouts/index.less';
import { VisibilityFiltersEnum } from '../../common/constants';
import { useEffect } from 'react';

export default function TodoList() {
  const [todos, filterTodos] = useTodo(({ todos, filterTodos }) => [todos, filterTodos]);

  useEffect(() => {
    filterTodos(VisibilityFiltersEnum.ALL);
  }, []);

  return (
    <ul className={styles['todo-list']}>
      {todos?.length
        ? todos.map((todo) => {
          return <TodoItem key={`todo-${todo.id}`} todo={todo} />;
        })
        : "暂无待办项"}
    </ul>
  );
}
