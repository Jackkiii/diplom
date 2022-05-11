import React from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col";
import UserInfoBar from "../components/UserInfoBar";

const PersonalCabinet = () => {
    return (
        <Container>
            <Row className="mt-4">
                <Col md={3}>
                    <UserInfoBar/>
                </Col>
                <Col md={9}>

                </Col>
            </Row>
        </Container>
    );
};

export default PersonalCabinet;