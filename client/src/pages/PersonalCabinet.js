import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col";
import UserInfoBar from "../components/UserInfoBar";
import RowAddPublication from "../components/RowAddPublication";
import BlockPublications from "../components/BlockPublications";
import {observer} from "mobx-react-lite";
import {fetchCategories, fetchPublication, fetchPublicationListUserId} from "../http/publicationAPI";
import {Context} from "../index";

const PersonalCabinet = observer( () => {
    const {publication} = useContext(Context)
    const {user} = useContext(Context)

    useEffect(() => {
        fetchCategories().then(data => publication.setCategories(data))
        fetchPublicationListUserId(user.getUser.id).then(data => publication.setPublication(data.rows))
    },[])

    return (
        <Container>
            <Row className="mt-4">
                <Col md={3}>
                    <UserInfoBar/>
                </Col>
                <Col md={9}>
                    <RowAddPublication/>
                    <hr/>
                    <BlockPublications/>
                </Col>
            </Row>
        </Container>
    );
});

export default PersonalCabinet;