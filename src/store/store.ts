import {applyMiddleware, combineReducers, createStore} from "redux";
import {TaskListReducer} from "./TaskListStore/TaskListStore";
import thunkMiddleware from "redux-thunk";

let rootReducer = combineReducers({
    taskList: TaskListReducer
})
export type RootReducer = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store=store