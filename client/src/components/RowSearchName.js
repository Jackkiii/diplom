import React from 'react';
import {Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
//import '../css/SearchNameInp.css'

const RowSearchName = observer( () => {
    return (
        <div>
            <Form.Control
                placeholder="Введите название публикации..."
            />
        </div>
    );
});

export default RowSearchName;