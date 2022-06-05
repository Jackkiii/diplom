import React, {useContext, useState} from 'react';
import {Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const RowSearchName = observer( () => {
    const {publication} = useContext(Context)
    const [searchName, setSearchName] = useState('')

    return (
        <div>
            <Form.Control
                className="row-search"
                placeholder="Введите название публикации..."
                value={searchName}
                onChange={e => {
                    setSearchName(e.target.value)
                    publication.setSelectedName(e.target.value)
                }}
            />
        </div>
    );
});

export default RowSearchName;