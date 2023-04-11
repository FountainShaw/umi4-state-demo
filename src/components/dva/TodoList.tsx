import { useSelector, useDispatch } from 'umi';
import { State, ActionType, createAction, namespace } from '../../models/dvaTodo';
import TodoItem from "./TodoItem";
import styles from '../../layouts/index.less';
import { TodoType } from '../../common/types';
import { useEffect } from 'react';
import { VisibilityFiltersEnum } from '../../common/constants';

export default function TodoList() {
  const dispatch = useDispatch();

  const todos = useSelector(
    (state: { [namespace]: State }) => state[namespace].todos,
  ) as TodoType[];

  useEffect(() => {
    dispatch(createAction(ActionType.filterTodos)({ active: VisibilityFiltersEnum.ALL }));
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
