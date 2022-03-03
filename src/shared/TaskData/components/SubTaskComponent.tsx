import React, {FC, useState} from 'react';
import {Button, Form, Input, List, notification, Space} from "antd";
import {CreatedSubTask, SubTaskComponentModel} from "../TaskComponent.model";
import '../TaskComponent.scss'
import {useDispatch} from "react-redux";
import {addSubTask, updateTask} from "../../../store/TaskListStore/TaskListStore";
import {PlusOutlined} from "@ant-design/icons";
import {SubTaskListComponent} from "./SubTaskListComponent";

const SubTaskComponent: FC<SubTaskComponentModel> = ({subTask, taskId,completedTask}) => {
    const [addNewSubTask, setAddNewSubTask] = useState<boolean>(false)
    const [createSubTask,setCreateSubTsk] = useState(false)
    const dispatch = useDispatch()
    const onSubmit = (data: CreatedSubTask) => {
        setCreateSubTsk(true)
        dispatch(addSubTask(data.description, taskId, true))
    }
    const chekCompletedSubTask = (subTaskId:string) => {
        const activeSubTask = subTask?.filter(task => !task.completed)
        if (activeSubTask?.length ===1 && activeSubTask[0].id ===subTaskId){
            const btn = (
                <Button type="primary" size="small" onClick={() => {
                    taskId && notification.close(taskId)
                    dispatch(updateTask({completed: true}, taskId))}
                }>
                    Завершить
                </Button>
            );
            notification['success']({
                message: 'Закрыть задачу?',
                description:
                    'Последняя подзадача завершена, закрыть основную задачу?',
                btn,
                key: taskId,
                duration: 5,
            });
        }
    }

    return (
        <div>
            <div className={`sub-task-list ${addNewSubTask ? 'with-form' : 'without-form'}`}>
                <List
                    dataSource={subTask.sort((a, b) => (parseInt(a.id, 10) < parseInt(b.id, 10) || a.completed > b.completed ? 1 : -1))}
                    renderItem={item => <SubTaskListComponent subTask={item} taskId={taskId} chekCompletedSubTask={chekCompletedSubTask} completedTask={completedTask}/>}
                />
            </div>
            <div className={'sub-task-edit-block'}>
                {addNewSubTask &&
                <Form name={"addSubTask"} onFinish={onSubmit} className={"sub-task-form"}>
                    <Form.Item name={"description"} rules={[{
                        required: true,
                        message: "Введите описание подзадачи"
                    }]}>
                        <Input.TextArea placeholder={"Описание подзадачи"} showCount maxLength={500} autoSize={true}
                                        bordered={false} autoFocus={true}/>
                    </Form.Item>
                    <Space>
                        <Button htmlType={"submit"} loading={createSubTask}>Создать</Button>
                        <Button danger onClick={() => setAddNewSubTask(false)}>Отмена</Button>
                    </Space>
                </Form>
                }
                {!addNewSubTask && !completedTask &&
                <Button onClick={() => setAddNewSubTask(true)} block icon={<PlusOutlined/>}>Создать подзадачу</Button>}
            </div>

        </div>
    )
};

export default SubTaskComponent;