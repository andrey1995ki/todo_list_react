import React, {FC} from 'react';
import Modal from "antd/lib/modal/Modal";
import {ModalComponentModel} from "./ModalComponent.model";
import './ModalComponent.scss'


export const ModalComponent: FC<ModalComponentModel> = ({isModalVisible, closeModal, children}) => {
    return (
        <Modal title={false} visible={isModalVisible} onCancel={() => closeModal(false)}
               className={"task-modal-window"} width={'98vw'}
               bodyStyle={{overflow: "auto", height: '98vh', maxHeight: '98vh'}}
               footer={false}
               destroyOnClose={true}
        >
            {children}
        </Modal>
    );
};