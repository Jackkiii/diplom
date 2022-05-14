import React from 'react';
import Modal from "react-bootstrap/Modal"
import {Button, Form} from "react-bootstrap";

const AdminPanel = ({show, onHide}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Панель администратора
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex flex-column">
                    <div className="d-flex align-items-center flex-row">
                        <Form.Label style={{marginRight: 8}}>Добавить новую категорию: </Form.Label>
                        <Form.Control
                            placeholder="Введите категорию..."
                        />
                    </div>
                    <div className="d-flex align-items-center flex-row">
                        <Form.Label style={{marginRight: 8}}>Добавить новую группу: </Form.Label>
                        <Form.Control
                            placeholder="Введите номер группы..."
                        />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" style={{boxShadow: "none"}} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AdminPanel;