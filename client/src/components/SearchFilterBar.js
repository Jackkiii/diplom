import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import ListGroup from "react-bootstrap/ListGroup";
import {Dropdown, Form} from "react-bootstrap";
//import '../css/SearchBar.css'

const SearchFilterBar = observer( () => {
    const {publication} = useContext(Context)

    return (
        <ListGroup variant="flush">
            <ListGroup.Item>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary">{publication.selectedGroup.name || "Выберите группу"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {publication.group.map(gr =>
                            <Dropdown.Item
                                onClick={() => publication.setSelectedGroup(gr)}
                                key={gr.id}
                            >{gr.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </ListGroup.Item>
            <ListGroup.Item>
                <Dropdown className='customDropdown'>
                    <Dropdown.Toggle variant="secondary">{publication.selectedCategory.name || "Выберите тип публикации"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {publication.category.map(cat =>
                            <Dropdown.Item
                                onClick={() => publication.setSelectedCategory(cat)}
                                key={cat.id}
                            >{cat.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </ListGroup.Item>
            <ListGroup.Item>
                <Form.Label>Автор: </Form.Label>
                <Form.Control/>
            </ListGroup.Item>
            <ListGroup.Item>
                <Form.Label>Год: </Form.Label>
                <Form.Control/>
            </ListGroup.Item>
        </ListGroup>
    );
});

export default SearchFilterBar;