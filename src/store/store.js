import {applyMiddleware, combineReducers, createStore} from "redux";
import {TaskListReducer} from "./TaskListStore/TaskListStore";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    taskList: TaskListReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store=store