import { useDispatch, useSelector } from 'umi';
import { ActionType, createAction, State, namespace } from '../../models/dvaTodo';
import { VISIBILITY_FILTERS_OPTS, VisibilityFiltersEnum } from "../../common/constants";
import styles from '../../layouts/index.less';

export default function VisibilityFilters() {
  const dispatch = useDispatch();
  
  const activeFilter = useSelector(
    (state: { [namespace]: State }) => state[namespace].activeFilter,
  ) as VisibilityFiltersEnum;

  function onFilterHandle(value: VisibilityFiltersEnum) {
    dispatch(createAction(ActionType.filterTodos)({ active: value }));
  }

  return (
    <div className={styles['filters']}>
      {VISIBILITY_FILTERS_OPTS.map(({value, text}) => {
        return (
          <div
            key={`visibility-filter-${value}`}
            className={styles[`filter${value === activeFilter ? '--active' : ''}`]}
            onClick={() => onFilterHandle(value)}
          >
            {text}
          </div>
        );
      })}
    </div>
  );
}
