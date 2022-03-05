import React, {FC} from 'react';
import {Button, Col, Row} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {ModalComponent} from "../Modal/ModalComponent";
import {CreateTaskComponent} from "../CreatedTask/CreateTaskComponent";
import {TaskHeaderModel} from "./TaskHeader.model";
import './TaskHeader.scss'

export const TaskHeader: FC<TaskHeaderModel> = ({
                                                    showCreateModal,
                                                    setShowCreateModal,
                                                    needUpdate, createdTaskData, children
                                                }) => {
    return (
        <div className={'task-header'}>
            <Row justify="space-between">
                <Col span={8}>
                    <Button icon={<PlusOutlined/>} onClick={() => setShowCreateModal(true)}>
                        Создать новую задачу
                    </Button>
                </Col>
                <Col span={8} className={'task-header-sort'} style={{}}>
                    {children}
                </Col>
            </Row>
            <ModalComponent isModalVisible={showCreateModal} closeModal={setShowCreateModal} needUpdate={needUpdate}>
                <CreateTaskComponent closeModal={setShowCreateModal} createdTaskData={createdTaskData}/>
            </ModalComponent>
        </div>
    );
};