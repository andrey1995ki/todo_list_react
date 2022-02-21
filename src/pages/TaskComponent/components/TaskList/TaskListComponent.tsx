import React, {FC, useState} from 'react';
import {TaskListModelProps} from "./TaskList.model";
import {Badge, Card, List, Typography} from "antd";
import {ModalComponent} from "../../../../shared/Modal/ModalComponent";
import {TaskComponent} from "../Task/TaskComponent";

const { Paragraph } = Typography;

export const TaskListComponent: FC<TaskListModelProps> = ({taskList,showModal,setShowModal}) => {
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
                renderItem={item => (
                    <List.Item>
                        <Card hoverable title={item.taskName}
                              extra={<Badge status={item.completed ? "success" : "error"}/>} onClick={()=>modalVisible(item.id)}>
                            <Paragraph ellipsis={{ rows: 3, expandable: false }}>
                            {item.taskDescription}
                            </Paragraph>
                        </Card>
                    </List.Item>
                )}
            />
            <ModalComponent isModalVisible={showModal} closeModal={setShowModal}>
                <TaskComponent taskId={idShowTask} closeModal={setShowModal}/>
            </ModalComponent>
        </div>
    );
};