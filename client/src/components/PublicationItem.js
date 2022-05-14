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
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Больше информации</Accordion.Header>
                    <Accordion.Body>
                        Файл: {publication.file} <br/>
                        Дополнительная информация: {publication.info}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <hr/>
        </div>
    );
};

export default PublicationItem;