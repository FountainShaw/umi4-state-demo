import TodoItem from "./TodoItem";
import { useTodoStore } from "../../models/hoxTodo";
import styles from '../../layouts/index.less';
import { useEffect } from "react";
import { VisibilityFiltersEnum } from "../../common/constants";

export default function TodoList() {
  const { todos, filterTodos } = useTodoStore();

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
