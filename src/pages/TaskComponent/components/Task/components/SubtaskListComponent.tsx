import React, {useState, FC} from 'react';
import {Button, Checkbox, Input, List, message, Popconfirm} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {deleteSubTasK, updateSubTask} from "../../../../../store/TaskListStore/TaskListStore";
import {useDispatch} from "react-redux";
import {SubTaskListModel} from "../TaskComponent.model";

export const SubtaskListComponent: FC<SubTaskListModel> = ({subTask, taskId,chekCompletedSubTask,completedTask}) => {
    const dispatch = useDispatch()
    const [editSubTask, setEditSubTask] = useState({subTaskId: "0", edit: false})
    const onChecked = (checked: any, subTaskId: string) => {
        if(checked){
            chekCompletedSubTask(subTaskId)
        }
        dispatch(updateSubTask({"completed": checked}, taskId, subTaskId))
    }
    const changeSubTask = (newValue: string, oldValue: string, subTaskId: string) => {
        if (newValue !== oldValue && newValue.length > 0) {
            dispatch(updateSubTask({"description": newValue.trim()}, taskId, subTaskId))
        }
        setEditSubTask({subTaskId: "0", edit: false})
    }
    const deleteSubTask = (subTaskId: string) => {
        message.success('Подзадача удалена');
        dispatch(deleteSubTasK(taskId, subTaskId))
    }
    return (
        <List.Item key={subTask.id} className={`sub-task-item${subTask.completed ? '-completed' : ''}`}>
            <List.Item.Meta
                title={
                    editSubTask.edit && subTask.id === editSubTask.subTaskId && !subTask.completed
                        ? <Input.TextArea showCount maxLength={500} autoSize={true}
                                          defaultValue={subTask.description}
                                          onBlur={(data) => changeSubTask(data.target.value, subTask.description, subTask.id)}
                        />
                        : <div className={`sub-task-elem ${subTask.completed ? 'sub-task-completed' : ''}`}
                               onClick={() => {
                                   !completedTask &&
                                   setEditSubTask({subTaskId: subTask.id, edit: true})
                               }}>
                            {subTask.description}
                        </div>}
            />

            {editSubTask.edit && subTask.id === editSubTask.subTaskId && !subTask.completed
                ? <Popconfirm
                    placement="topRight"
                    title="Удалить выбранную подзадачу?"
                    onConfirm={() => deleteSubTask(subTask.id)}
                    okText="Удалить"
                    cancelText="Отмена"
                >
                    <Button type="text" icon={<DeleteOutlined/>}/>
                </Popconfirm>
                : <Popconfirm title="Вернуть задачу в работу?" disabled={!subTask.completed}
                              onConfirm={() => onChecked(false, subTask.id)}
                              okText="Вернуть"
                              cancelText="Отмена"
                              placement="topRight"
                >
                    <Checkbox onChange={() => !subTask.completed && onChecked(true, subTask.id)}
                              checked={subTask.completed} style={{marginLeft: 2}} disabled={completedTask}/>
                </Popconfirm>
            }
        </List.Item>
    );
};