// import { useState } from 'react';
import AddTodo from '../components/hox/AddTodo';
import TodoList from '../components/hox/TodoList';
import VisibilityFilters from '../components/hox/VisibilityFilters';
import { useTodoStore, TodoStoreProvider } from '../models/hoxTodo';
import styles from '../layouts/index.less';

const HoxContainer = () => {
  const { loading } = useTodoStore();

  return (
    <div className={styles['container']}>
      {
        loading && <div className={styles['container--modal']}>加载中...</div>
      }
      <h2>Hox Todo List</h2>
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  )
};

const HoxPage = () => (
  <TodoStoreProvider>
    <HoxContainer />
  </TodoStoreProvider>
)

// hox隐藏的问题，点击"改名"按钮后，会发现TodoStoreProvider里的UserInfo数据不更新
// const UserInfo = ({ name }: { name: string }) => {
//   return <div>{name}</div>
// }

// const HoxPage = () => {
//   const [name, setName] = useState('Demo')

//   return (
//     <div>
//       <UserInfo name={name} />
//       <button onClick={() => setName('Demo2')}>改名</button>
//       <TodoStoreProvider>
//         <UserInfo name={name} />
//         <h2>Hox Todo List</h2>
//         <AddTodo />
//         <TodoList />
//         <VisibilityFilters />
//       </TodoStoreProvider>
//     </div>
//   );
// }

export default HoxPage;