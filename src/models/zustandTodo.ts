import { TodoType } from '@/common/types';
import { create } from 'zustand'
// import { devtools } from 'zustand/middleware'
import { VisibilityFiltersEnum } from "../common/constants";
import { addTodoApi, toggleTodoApi, queryTodoApi } from '../common/mockApi';

interface State {
    loading: boolean;
    todos: TodoType[];
    activeFilter: VisibilityFiltersEnum;

    addTodo: (content: string) => Promise<void>;
    toggleTodo: (id: number) => Promise<void>;
    filterTodos: (active: VisibilityFiltersEnum) => Promise<void>;
}

export const useTodo = create<State>((set, get) => ({
    loading: false,
    todos: [],
    activeFilter: VisibilityFiltersEnum.ALL,

    addTodo: async (content) => {
        const newTodo = {
            content,
            completed: false,
        };

        set({ loading: true });
        const { activeFilter: active } = get();
        const result = await addTodoApi({ active, newTodo });
        if (result) set({ todos: result });
        set({ loading: false });
    },

    toggleTodo: async (id) => {
        set({ loading: true });

        const { activeFilter: active } = get();
        const result = await toggleTodoApi({ active, id });
        if (result) set({ todos: result });
        set({ loading: false });
    },

    filterTodos: async (active) => {
        set({ loading: true, activeFilter: active });
    
        const result = await queryTodoApi({ active });
        if (result) set({ todos: result });
        set({ loading: false });
    }
}));

// 配合redux-devtools插件使用，可以跟踪状态的变化情况
// export const useTodo = create<State>(
    // devtools(useZustandTodo, { name: 'zustandTodo' })
// )
