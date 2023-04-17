import { useTodo } from '../../models/zustandTodo';
import TodoItem from "./TodoItem";
import styles from '../../layouts/index.less';
import { VisibilityFiltersEnum } from '../../common/constants';
import { useEffect } from 'react';
import { shallow } from 'zustand/shallow'

export default function TodoList() {
  // 在同时引用多个状态时，shallow使得只有在todos或filterTodos改变的时候才重新渲染
  const [todos, filterTodos] = useTodo(({ todos, filterTodos }) => [todos, filterTodos], shallow);

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
