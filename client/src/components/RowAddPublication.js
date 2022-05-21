import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import CreatePublication from "./modals/CreatePublication";

const RowAddPublication = () => {
    const [publicationVisible, setPublicationVisible] = useState(false)
    return (
        <div className="d-flex justify-content-between align-items-center">
            <div>
                Мои публикации
            </div>
            <Button
                variant="outline-primary"
                style={{boxShadow: "none"}}
                onClick={() => setPublicationVisible(true)}
            >Добавить</Button>
            <CreatePublication show={publicationVisible} onHide={() => setPublicationVisible(false)}/>
        </div>
    );
};

export default RowAddPublication;