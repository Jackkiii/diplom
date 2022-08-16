import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal"
import {Button, Dropdown, Form} from "react-bootstrap";
import {createCategory, createGroup, delCategory, fetchCategories} from "../../http/publicationAPI";
import {delGroup, fetchGroups, registration, registrationAdmin} from "../../http/userAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const AdminPanel = observer(({show, onHide}) => {
    const {publication} = useContext(Context)
    const {user} = useContext(Context)

    useEffect(() => {
        fetchCategories().then(data => publication.setCategories(data))
        fetchGroups().then(data => user.setGroup(data))
    },[])

    const [valueCategory, setValueCategory] = useState('')
    const [valueGroup, setValueGroup] = useState('')
    const [valueLogin, setValueLogin] = useState('')
    const [valuePassword, setValuePassword] = useState('')

    const addCategory = () => {
        createCategory({name: valueCategory}).then(data => {
            setValueCategory('')
            //onHide()
        })
    }

    const deleteCategory = () => {
        delCategory({name: publication.selectedCategoryDel.name}).then(data => {
            console.log('Категория удалена')
        })
    }

    const addGroup= () => {
        createGroup({name: valueGroup}).then(data => {
            setValueGroup('')
            //onHide()
        })
    }

    const deleteGroup = () => {
        //console.log(user.selectedGroupDel.name)
        delGroup({name: user.selectedGroupDel.name}).then(data => {
            console.log('группа удалена')
        })
    }

    const createNewAdmin = async () => {
        try {
            await registrationAdmin(valueLogin, valuePassword).then(data => onHide())
        } catch (e) {
            alert(e)
        }
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
                    <div className="d-flex align-items-center flex-row row-ad">
                        <Form.Label className="custom-label-ap" style={{marginRight: 8}}>Добавить новую категорию: </Form.Label>
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

                    <div className="d-flex align-items-center flex-row row-ad">
                        <Form.Label className="custom-label-ap" style={{marginRight: 8}}>Удалить категорию: </Form.Label>
                        <Dropdown className='customDropdown'>
                            <Dropdown.Toggle>{publication.selectedCategoryDel.name || "Выберите категорию"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {publication.category.map(cat =>
                                    <Dropdown.Item
                                        onClick={() => publication.setSelectedCategoryDel(cat)}
                                        key={cat.id}
                                    >{cat.name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button
                            variant="outline-danger"
                            style={{boxShadow: "none", marginLeft: 8}}
                            onClick={deleteCategory}>Удалить</Button>
                    </div>

                    <div className="d-flex align-items-center flex-row row-ad">
                        <Form.Label className="custom-label-ap" style={{marginRight: 8}}>Добавить новую группу: </Form.Label>
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

                    <div className="d-flex align-items-center flex-row row-ad">
                        <Form.Label className="custom-label-ap" style={{marginRight: 8}}>Удалить группу: </Form.Label>
                        <Dropdown className='customDropdown'>
                            <Dropdown.Toggle>{user.selectedGroupDel.name || "Выберите группу"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {user.group.map(gr =>
                                    <Dropdown.Item
                                        key={gr.id}
                                        onClick={() => user.setSelectedGroupDel(gr)}
                                    >{gr.name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button
                            variant="outline-danger"
                            style={{boxShadow: "none", marginLeft: 8}}
                            onClick={deleteGroup}>Удалить</Button>
                    </div>

                </Form>
            </Modal.Body>
            <Modal.Body className="custom-modal-body">
                <div className="d-flex align-items-center flex-row row-ad">
                    <Form.Label className="custom-label-ap-new-admin" style={{marginRight: 8}}>Добавить нового администратора: </Form.Label>
                    <Form.Control
                        className="first-input"
                        value={valueLogin}
                        onChange={e => setValueLogin(e.target.value)}
                        placeholder="Логин..."
                    />
                    <Form.Control
                        type="password"
                        value={valuePassword}
                        onChange={e => setValuePassword(e.target.value)}
                        placeholder="Пароль..."
                    />
                    <Button
                        variant="outline-success"
                        style={{boxShadow: "none", marginLeft: 8}}
                        onClick={createNewAdmin}>Добавить</Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outline-danger"
                    style={{boxShadow: "none"}}
                    onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AdminPanel;