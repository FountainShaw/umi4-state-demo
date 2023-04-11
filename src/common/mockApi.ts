import { TodoType } from '../common/types';
import { VisibilityFiltersEnum } from './constants';

let databaseTodos = [] as TodoType[];
let nextId = 0;

// 模拟后台数据筛选方法
function getTodos(active: VisibilityFiltersEnum, totalTodos: TodoType[]): TodoType[] {
    switch (active) {
        case VisibilityFiltersEnum.ALL:
            return totalTodos;
        case VisibilityFiltersEnum.INCOMPLETE:
            return totalTodos.filter((todo) => !todo.completed);
        case VisibilityFiltersEnum.COMPLETED:
            return totalTodos.filter((todo) => todo.completed);
        default:
            return totalTodos;
    }
}

async function fakeFetch(response: any) {
    await new Promise((resolve) => {
        const random = Math.random() * 500 + 500;
        setTimeout(() => resolve(response), random);
    })
}

export async function addTodoApi(request: { active: VisibilityFiltersEnum, newTodo: Omit<TodoType, 'id'> }): Promise<TodoType[]> {
    databaseTodos = databaseTodos.concat({ ...request.newTodo, id: nextId });
    await fakeFetch(databaseTodos);
    nextId++;
    return getTodos(request.active, databaseTodos)
}

export async function toggleTodoApi(request: { active: VisibilityFiltersEnum, id: number }): Promise<TodoType[]> {
    databaseTodos = databaseTodos.map((todo) => {
        if (todo.id === request.id) {
            return {
                ...todo,
                completed: !todo.completed,
            };
        }
        return todo;
    })
    await fakeFetch(databaseTodos);
    return getTodos(request.active, databaseTodos)
}

export async function queryTodoApi(request: { active: VisibilityFiltersEnum }): Promise<TodoType[]> {
    await fakeFetch(request);
    return getTodos(request.active, databaseTodos)
}
