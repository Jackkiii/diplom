import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal"
import {Button, Form, Dropdown} from "react-bootstrap";
import {Context} from "../../index";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/style.css'
import {observer} from "mobx-react-lite";
import {createPublication, fetchCategories} from "../../http/publicationAPI";

const CreatePublication = observer(({show, onHide}) => {
    const {publication} = useContext(Context)
    const {user} = useContext(Context)

    useEffect(() => {
        fetchCategories().then(data => publication.setCategories(data))
    },[])

    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [author, setAuthor] = useState('')
    const [file, setFile] = useState(null)

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addPublication = () => {
        const formData = new FormData()
        formData.append('userId', user.getUser.id)
        formData.append('name', name)
        formData.append('date', date)
        formData.append('author', author)
        //formData.append('link_file', file)
        formData.append('categoryId', publication.selectedCategory.id)
        console.log(formData)
        createPublication(formData).then(data => onHide())
    }

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
                        <Form.Label className='customLabel' style={{marginRight: 8}}>Категория: </Form.Label>
                        <Dropdown className='new-publication customDropdown'>
                            <Dropdown.Toggle>{publication.selectedCategory.name || "Выберите категорию публикации"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {publication.category.map(cat =>
                                    <Dropdown.Item
                                        onClick={() => publication.setSelectedCategory(cat)}
                                        key={cat.id}
                                    >{cat.name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="d-flex align-items-center flex-row" style={{marginTop: 8}}>
                        <Form.Label className='customLabel' style={{marginRight: 8}}>Название: </Form.Label>
                        <Form.Control
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Введите название публикации..."
                        />
                    </div>
                    <div className="d-flex align-items-center flex-row" style={{marginTop: 8}}>
                        <Form.Label className='customLabel' style={{marginRight: 8}}>Авторы: </Form.Label>
                        <Form.Control
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                            placeholder="Введите автора(-ов)..."
                        />
                    </div>
                    <div className="d-flex align-items-center flex-row" style={{marginTop: 8}}>
                        <Form.Label className='customLabel' style={{marginRight: 8}}>Год: </Form.Label>
                        <Form.Control
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            placeholder="Введите год..."
                        />
                    </div>
                    <div className="d-flex align-items-center flex-row" style={{marginTop: 8}}>
                        <Form.Label className='customLabel' style={{marginRight: 8}}>Файл: </Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="Выбрать файл"
                            onChange={selectFile}
                        />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" style={{boxShadow: "none"}} onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" style={{boxShadow: "none"}} onClick={addPublication}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreatePublication;