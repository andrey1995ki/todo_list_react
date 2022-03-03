import React, {FC, useState} from 'react';
import {TaskListByDateModel} from "../CalendarComponent.model";
import moment from "moment";

export const TaskListByDateComponent: FC<TaskListByDateModel> = ({
                                                                     selectedDate,
                                                                     taskList,
                                                                     sortAt
}) => {
    const [sortTask, setSortTask] = useState(sortAt)
    let taskListByDate
    if (sortTask === 'all') {
        taskListByDate = taskList.filter(task =>
            moment(task.plannedAt).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD')
            && moment(task.createdAt).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD'))
    } else {
        taskListByDate = taskList.filter(task =>
            moment(task[sortTask]).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD'))
    }

    return (
        <div>
            {selectedDate.format('LL')}
            <ul>
                {taskListByDate.map(task => <li key={task.id}>{task.taskName}</li>)}
            </ul>
        </div>
    );
};