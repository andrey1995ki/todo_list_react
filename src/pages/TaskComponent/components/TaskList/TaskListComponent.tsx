import React, {FC, useState} from 'react';
import {TaskListModelProps} from "./TaskList.model";
import {Badge, Card, List, Typography} from "antd";
import {ModalComponent} from "../../../../shared/Modal/ModalComponent";
import {TaskComponent} from "../Task/TaskComponent";
import './TaskListComponent.scss'
import moment from "moment";

const { Paragraph } = Typography;

export const TaskListComponent: FC<TaskListModelProps> = ({taskList,showModal,setShowModal,needUpdate}) => {
    const [idShowTask, setIdShowTask] = useState<string>('0')
    const modalVisible = (id:string) => {
        setIdShowTask(id)
        setShowModal(true)
    }
    return (
        <div>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 3,
                    xxl: 3,
                }}
                dataSource={taskList}
                renderItem={(item,index) => (
                    <List.Item className={'card-item'}>
                        <Card hoverable title={item.taskName} className={`task-card card-${index%2===0 ?'even':'not-even'}`}
                              extra={<Badge status={item.completed ? "success" : "error"}/>} onClick={()=>modalVisible(item.id)}>
                            <Paragraph ellipsis={{ rows: 3, expandable: false }}>
                            {item.taskDescription}
                            </Paragraph>
                            <Paragraph >
                                Выполнить до: {moment(item.plannedAt).format('LL')}
                            </Paragraph>
                        </Card>
                    </List.Item>
                )}
            />
            <ModalComponent isModalVisible={showModal} closeModal={setShowModal} needUpdate={needUpdate}>
                <TaskComponent taskId={idShowTask} closeModal={setShowModal} needUpdate={needUpdate}/>
            </ModalComponent>
        </div>
    );
};