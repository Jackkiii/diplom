import React, {useEffect, useState} from 'react';
import Accordion from 'react-bootstrap/Accordion'
import '../css/style.css'
import {fetchOneCategories, fetchPublicationFile} from "../http/publicationAPI";

const PublicationItem = ({publication}) => {
    const [category, setCategory] = useState({category: []})
    useEffect(() => {
        fetchOneCategories(publication.categoryId).then(data => setCategory(data))
    }, [])

    const downloadFile = async (e) => {
        e.stopPropagation()
        await fetchPublicationFile(publication.link_file)
    }

    return (
        <div>
            <div>
                {publication.name}
            </div>
            <div>
                Авторы: <span style={{textDecoration: 'underline', cursor: 'pointer'}}>{publication.author}</span><br/>
                Тип публикации: {category.name}
            </div>
            <Accordion className="custom-according">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Больше информации</Accordion.Header>
                    <Accordion.Body>
                        Файл: <span onClick={(e) => downloadFile(e)}>{publication.link_file}</span> <br/>
                        Год публикации: {publication.date}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <hr/>
        </div>
    );
};

export default PublicationItem;