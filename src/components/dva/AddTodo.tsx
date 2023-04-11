import { useState } from "react";
import { useDispatch } from 'umi';
import { ActionType, createAction } from '../../models/dvaTodo';
import styles from '../../layouts/index.less';

export default function AddTodo() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  function handleAddTodo() {
    if (!input) {
      alert('请添加待办项描述');
      return;
    }

    dispatch(createAction(ActionType.addTodo)({ content: input }));
    setInput("");
  }

  return (
    <div>
      <input onChange={(e) => setInput(e.target.value)} value={input} />
      <button className={styles['add-todo']} onClick={handleAddTodo}>
        新增
      </button>
    </div>
  );
}
