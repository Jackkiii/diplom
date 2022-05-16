import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal"
import {Button, Form} from "react-bootstrap";
import {createCategory, createGroup} from "../../http/publicationAPI";

const AdminPanel = ({show, onHide}) => {
    const [valueCategory, setValueCategory] = useState('')
    const [valueGroup, setValueGroup] = useState('')

    const addCategory = () => {
        createCategory({name: valueCategory}).then(data => {
            setValueCategory('')
            onHide()
        })
    }

    const addGroup= () => {
        createGroup({name: valueGroup}).then(data => {
            setValueGroup('')
            onHide()
        })
    }

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
                            value={valueCategory}
                            onChange={e => setValueCategory(e.target.value)}
                            placeholder="Введите категорию..."
                        />
                        <Button
                            variant="outline-success"
                            style={{boxShadow: "none", marginLeft: 8}}
                            onClick={addCategory}>Добавить</Button>
                    </div>
                    <div className="d-flex align-items-center flex-row">
                        <Form.Label style={{marginRight: 8}}>Добавить новую группу: </Form.Label>
                        <Form.Control
                            value={valueGroup}
                            onChange={e => setValueGroup(e.target.value)}
                            placeholder="Введите номер группы..."
                        />
                        <Button
                            variant="outline-success"
                            style={{boxShadow: "none", marginLeft: 8}}
                            onClick={addGroup}>Добавить</Button>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outline-danger"
                    style={{boxShadow: "none"}}
                    onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AdminPanel;