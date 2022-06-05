import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col";
import SearchFilterBar from "../components/SearchFilterBar";
import {observer} from "mobx-react-lite";
import RowSearchName from "../components/RowSearchName";
import BlockAllPublications from "../components/BlockAllPublications";
import {Context} from "../index";
import {fetchCategories, fetchPublication} from "../http/publicationAPI";
import {fetchGroups} from "../http/userAPI";
import Pages from "../components/Pages";


const PublicationList = observer( () => {
    const {publication} = useContext(Context)
    const {user} = useContext(Context)

    useEffect(() => {
        fetchCategories().then(data => publication.setCategories(data))
        fetchGroups().then(data => user.setGroup(data))
        fetchPublication(null, null, null, null,1,4).then(data => {
            publication.setPublication(data.rows)
            publication.setTotalCount(data.count)
        })
    }, [])

    useEffect( () => {
        fetchPublication(null, publication.selectedCategory.id, publication.selectedDate, null, publication.page,4).then(data => {
            publication.setPublication(data.rows)
            publication.setTotalCount(data.count)
        })
    },[publication.page, user.page, publication.selectedCategory.id, publication.selectedDate])

    return (
        <Container>
            <Row className="mt-4">
                <Col md={3}>
                    <SearchFilterBar/>
                </Col>
                <Col md={9}>
                    <RowSearchName/>
                    <BlockAllPublications/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default PublicationList;