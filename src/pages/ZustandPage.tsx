import AddTodo from '../components/zustand/AddTodo';
import TodoList from '../components/zustand/TodoList';
import VisibilityFilters from '../components/zustand/VisibilityFilters';
import { useTodo } from '../models/zustandTodo';
import styles from '../layouts/index.less';

const ZustandPage = () => {
  const loading = useTodo((state) => state.loading);

  return (
    <div className={styles['container']}>
      {
        loading && <div className={styles['container--modal']}>加载中...</div>
      }
      <h2>Zustand Todo List</h2>
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
};

export default ZustandPage;
