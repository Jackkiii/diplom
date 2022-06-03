import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import '../css/style.css'

const PublicationItem = ({publication}) => {
    return (
        <div>
            <div>
                {publication.name}
            </div>
            <div>
                Авторы: {publication.author}
            </div>
            <Accordion className="custom-according">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Больше информации</Accordion.Header>
                    <Accordion.Body>
                        Файл: {publication.file} <br/>
                        Год публикации: {publication.date}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <hr/>
        </div>
    );
};

export default PublicationItem;