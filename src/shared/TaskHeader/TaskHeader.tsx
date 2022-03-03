import React, {FC} from 'react';
import {Button, Col, Row} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {ModalComponent} from "../Modal/ModalComponent";
import {CreateTaskComponent} from "../../pages/TaskComponent/components/CreateTask/CreateTaskComponent";
import {TaskHeaderModel} from "./TaskHeader.model";

export const TaskHeader:FC<TaskHeaderModel> = ({showCreateModal,
                                                   setShowCreateModal,
                                                   needUpdate, children}) => {
    return (
    <>
        <Row justify="space-between">
            <Col span={8}>
                <Button icon={<PlusOutlined/>} onClick={() => setShowCreateModal(true)}>
                    Создать новую задачу
                </Button>
            </Col>
            <Col span={8} style={{textAlign: "right", marginRight: 10}}>
                {children}
            </Col>
        </Row>
        <ModalComponent isModalVisible={showCreateModal} closeModal={setShowCreateModal} needUpdate={needUpdate}>
            <CreateTaskComponent closeModal={setShowCreateModal}/>
        </ModalComponent>
    </>
    );
};