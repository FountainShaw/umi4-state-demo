import { TodoType } from '../common/types';
import { VisibilityFiltersEnum } from "../common/constants";
import { addTodoApi, toggleTodoApi, queryTodoApi } from '../common/mockApi';

interface PayloadType {
    content: string;
    id: number;
    active: VisibilityFiltersEnum;
}

export enum ActionType {
    addTodo = 'addTodo',
    toggleTodo = 'toggleTodo',
    filterTodos = 'filterTodos',

    loadingPage = 'loadingPage',
    resetTodos = 'resetTodos',
    changeFilter = 'changeFilter',
}

export interface EffectsCommandMap {
    put: Function,
    call: Function,
    select: Function,
    [key: string]: any,
}

export interface State {
    loading: boolean;
    todos: TodoType[];
    activeFilter: VisibilityFiltersEnum;
}

export const namespace = 'dva.todo';

export const createAction = (key: ActionType) => {
    return (payload: Partial<PayloadType>) => {
        return { type: `${namespace}/${key}`, payload };
    };
};

const currentState = (_: any) => _[namespace];

const state: State = {
    loading: false,
    todos: [],
    activeFilter: VisibilityFiltersEnum.ALL,
};

// 异步 action，用来发送异步请求
const effects = {
    *[ActionType.addTodo]({ payload }: { payload: { content: string } }, { select, call, put }: EffectsCommandMap) {
        const newTodo = {
            content: payload.content,
            completed: false,
        };

        yield put({ type: ActionType.loadingPage, payload: { loading: true } });
        const state: State = yield select(currentState);
        const result = (yield call(addTodoApi, { active: state.activeFilter, newTodo })) as TodoType[];
        if (result) yield put({ type: ActionType.resetTodos, payload: { todos: result } });
        yield put({ type: ActionType.loadingPage, payload: { loading: false } });
    },

    *[ActionType.toggleTodo]({ payload }: { payload: { id: number } }, { select, call, put }: EffectsCommandMap) {
        yield put({ type: ActionType.loadingPage, payload: { loading: true } });
        const state: State = yield select(currentState);
        const result = (yield call(toggleTodoApi, { active: state.activeFilter, id: payload.id })) as TodoType[];
        if (result) yield put({ type: ActionType.resetTodos, payload: { todos: result } });
        yield put({ type: ActionType.loadingPage, payload: { loading: false } });
    },

    *[ActionType.filterTodos]({ payload }: { payload: { active: VisibilityFiltersEnum } }, { select, call, put }: EffectsCommandMap) {
        yield put({ type: ActionType.loadingPage, payload: { loading: true } });
        yield put({ type: ActionType.changeFilter, payload: { activeFilter: payload.active } });
        const state: State = yield select(currentState);
        const result = (yield call(queryTodoApi, { active: state.activeFilter })) as TodoType[];
        if (result) yield put({ type: ActionType.resetTodos, payload: { todos: result } });
        yield put({ type: ActionType.loadingPage, payload: { loading: false } });
    }
};

// 同步 action，用来修改 state
const reducers = {
    [ActionType.loadingPage](state: State, { payload }: { payload: { loading: boolean } }) {
        return { ...state, loading: payload.loading };
    },
    [ActionType.resetTodos](state: State, { payload }: { payload: { todos: TodoType } }) {
        return { ...state, todos: payload.todos };
    },
    [ActionType.changeFilter](state: State, { payload }: { payload: { activeFilter: VisibilityFiltersEnum } }) {
        return { ...state, activeFilter: payload.activeFilter };
    }
};

export default {
    namespace,
    state,
    reducers,
    effects,
}
