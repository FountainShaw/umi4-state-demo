import { useTodo } from '../../models/zustandTodo';
import { VISIBILITY_FILTERS_OPTS } from "../../common/constants";
import styles from '../../layouts/index.less';
import { shallow } from 'zustand/shallow'

export default function VisibilityFilters() {
  const [activeFilter, filterTodos] = useTodo(({ activeFilter, filterTodos }) => [activeFilter, filterTodos], shallow);

  return (
    <div className={styles['filters']}>
      {VISIBILITY_FILTERS_OPTS.map(({ value, text }) => {
        return (
          <div
            key={`visibility-filter-${value}`}
            className={styles[`filter${value === activeFilter ? '--active' : ''}`]}
            onClick={() => filterTodos(value)}
          >
            {text}
          </div>
        );
      })}
    </div>
  );
}
