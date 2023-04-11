import { useState } from "react";
import { useTodoStore } from "../../models/hoxTodo";
import styles from '../../layouts/index.less';

export default function AddTodo() {
  const { addTodo } = useTodoStore();
  const [input, setInput] = useState("");

  function handleAddTodo() {
    if (!input) {
      alert('请添加待办项描述');
      return;
    }
    addTodo(input);
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
