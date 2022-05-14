import React, {useContext} from 'react';
import Modal from "react-bootstrap/Modal"
import {Button, Form, Dropdown} from "react-bootstrap";
import {Context} from "../../index";
import 'bootstrap/dist/css/bootstrap.min.css';
//import '../../css/style.css'

const CreatePublication = ({show, onHide}) => {
    const {publication} = useContext(Context)
    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить публикацию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex flex-column">
                    <div className="d-flex align-items-center flex-row">
                        <Form.Label style={{marginRight: 8}}>Категория: </Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle>Выберите категорию публикации</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {publication.category.map(cat =>
                                    <Dropdown.Item key={cat.id}>{cat.name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="d-flex align-items-center flex-row" style={{marginTop: 8}}>
                        <Form.Label style={{marginRight: 8}}>Название: </Form.Label>
                        <Form.Control
                            placeholder="Введите название публикации..."
                        />
                    </div>
                    <div className="d-flex align-items-center flex-row" style={{marginTop: 8}}>
                        <Form.Label style={{marginRight: 8}}>Авторы: </Form.Label>
                        <Form.Control
                            placeholder="Введите автора(-ов)..."
                        />
                    </div>
                    <div className="d-flex align-items-center flex-row" style={{marginTop: 8}}>
                        <Form.Label style={{marginRight: 8}}>Год: </Form.Label>
                        <Form.Control
                            placeholder="Введите год..."
                        />
                    </div>
                    <div className="d-flex align-items-center flex-row" style={{marginTop: 8}}>
                        <Form.Label style={{marginRight: 8}}>Файл: </Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="Выбрать файл"
                        />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" style={{boxShadow: "none"}} onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" style={{boxShadow: "none"}} onClick={onHide}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreatePublication;