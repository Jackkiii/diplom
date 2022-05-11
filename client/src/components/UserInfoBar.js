import React, {useContext} from 'react';
import {Context} from "../index";
import ListGroup from "react-bootstrap/ListGroup";

const UserInfoBar = () => {
    const {publication} = useContext(Context)
    return (
        <ListGroup variant="flush">
            {publication.category.map(cat =>
                <ListGroup.Item key={cat.id}>
                    {cat.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
};

export default UserInfoBar;