import { useSelector } from 'umi';
import { State, namespace } from '../models/dvaTodo';
import AddTodo from '../components/dva/AddTodo';
import TodoList from '../components/dva/TodoList';
import VisibilityFilters from '../components/dva/VisibilityFilters';
import styles from '../layouts/index.less';

const DvaPage = () => {
  const loading = useSelector(
    (state: { [namespace]: State }) => state[namespace].loading,
  ) as boolean;

  return (
    <div className={styles['container']}>
      {
        loading && <div className={styles['container--modal']}>加载中...</div>
      }
      <h2>Dva Todo List</h2>
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
};

export default DvaPage;
