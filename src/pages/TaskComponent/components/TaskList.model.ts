export interface TaskListModelProps {
    tasks:Array<TaskList>
}

export interface TaskList {
    "TaskName": string,
    "Completed": boolean,
    "id": number,
    "TaskDescription":string
}
