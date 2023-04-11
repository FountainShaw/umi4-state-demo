import { createStore } from "hox";
import { useState } from "react";
import { VisibilityFiltersEnum } from "../common/constants";
import { TodoType } from '../common/types';
import { addTodoApi, toggleTodoApi, queryTodoApi } from '../common/mockApi';

function useTodo() {
  const [loading, setLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [activeFilter, setActiveFilter] = useState(VisibilityFiltersEnum.ALL);

  async function addTodo(content: string) {
    const newTodo = {
      content,
      completed: false,
    };

    setLoading(true);
    const result = await addTodoApi({ active: activeFilter, newTodo });
    if (result) setTodos(result);
    setLoading(false);
  }

  async function toggleTodo(id: number) {
    setLoading(true);

    const result = await toggleTodoApi({ active: activeFilter, id });
    if (result) setTodos(result);

    setLoading(false);
  }

  async function filterTodos(active: VisibilityFiltersEnum) {
    setLoading(true);
    setActiveFilter(active);

    const result = await queryTodoApi({ active });
    if (result) setTodos(result);

    setLoading(false);
  }

  return {
    loading,
    todos,
    activeFilter,
    addTodo,
    toggleTodo,
    filterTodos,
  };
}

export const [useTodoStore, TodoStoreProvider] = createStore(useTodo);
