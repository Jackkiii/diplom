import React from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col";
import UserInfoBar from "../components/UserInfoBar";
import RowAddPublication from "../components/RowAddPublication";
import BlockPublications from "../components/BlockPublications";

const PersonalCabinet = () => {
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
};

export default PersonalCabinet;