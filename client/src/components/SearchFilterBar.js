import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import ListGroup from "react-bootstrap/ListGroup";
import {Dropdown, Form} from "react-bootstrap";

const SearchFilterBar = observer( () => {
    const {publication} = useContext(Context)
    const {user} = useContext(Context)
    const [searchDate, setSearchDate] = useState('')
    const [searchAuthor, setSearchAuthor] = useState('')

    //useEffect(() => {
    //    searchByDate(searchDate).then(data => publication.setSelectedDate(data))
    //    console.log(publication.selectedDate)
    //}, [searchDate])

    return (
        <ListGroup variant="flush">
            <ListGroup.Item>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary">{user.selectedGroup.name || "Выберите группу"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {user.group.map(gr =>
                            <Dropdown.Item
                                key={gr.id}
                                onClick={() => user.setSelectedGroup(gr)}
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
                <Form.Control
                    value={searchAuthor}
                    onChange={e => {setSearchAuthor(e.target.value)
                        publication.setSelectedAuthor(e.target.value)
                    }}/>
            </ListGroup.Item>
            <ListGroup.Item>
                <Form.Label>Год: </Form.Label>
                <Form.Control
                    value={searchDate}
                    onChange={e => {setSearchDate(e.target.value)
                        publication.setSelectedDate(e.target.value)
                    }}
                />
            </ListGroup.Item>
        </ListGroup>
    );
});

export default SearchFilterBar;