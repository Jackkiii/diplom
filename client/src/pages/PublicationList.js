import React from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col";
import SearchFilterBar from "../components/SearchFilterBar";
import {observer} from "mobx-react-lite";
import RowSearchName from "../components/RowSearchName";
import BlockAllPublications from "../components/BlockAllPublications";


const PublicationList = observer( () => {
    return (
        <Container>
            <Row className="mt-4">
                <Col md={3}>
                    <SearchFilterBar/>
                </Col>
                <Col md={9}>
                    <RowSearchName/>
                    <BlockAllPublications/>
                </Col>
            </Row>
        </Container>
    );
});

export default PublicationList;