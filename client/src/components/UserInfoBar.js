import React, {useContext, useEffect, useState} from "react";
import { Context } from "../index";
import ListGroup from "react-bootstrap/ListGroup";
import {fetchOneGroup} from "../http/userAPI";
import {fetchPublicationListUserId} from "../http/publicationAPI";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

const UserInfoBar = () => {
    const {user} = useContext(Context);
    const {publication} = useContext(Context);

    //const typeRole = user.getUser.role === 'USER'
    const typeRole =  ''

    const [group, setGroup] = useState({group: []})
    const [publicationList, setPublicationList] = useState({})

    useEffect(() => {
        fetchOneGroup(user.getUser.groupId).then(data => {
            setGroup(data)
            getPublicationList().then(data => setPublicationList(data))
        })
    }, [])

    const getPublicationList = () => fetchPublicationListUserId(user.getUser.id).then(data => ({
        name: user.getUser.full_name,
        group: group.name,
        list: data,
    }))

    const generatePDF = () => {
        pdfMake.vfs = pdfFonts.pdfMake.vfs
        let docInfo = {
            content: [
                {
                    text: 'Список публикаций',
                    alignment: 'center',
                    fontSize: 22,
                    marginBottom:30,
                }
                ]

        }
        docInfo.content.push({text: `Имя студента: ${user.getUser.full_name}`, alignment: 'right'})
        docInfo.content.push({text: `Группа студента: ${group.name}`, marginBottom:25, alignment: 'right'})
        publicationList.list.map(data => {
            docInfo.content.push({text: `Название публикации: ${data.name}`})
            docInfo.content.push({text: `Год публикации: ${data.date}`, marginBottom: 10})
        })
        pdfMake.createPdf(docInfo).download('Список работ.pdf');
    }

  return (
    <ListGroup variant="flush">
        {typeRole ?
            <ListGroup variant="flush">
                <ListGroup.Item>ФИО: {user.getUser.full_name}</ListGroup.Item>
                <ListGroup.Item>Email: {user.getUser.email}</ListGroup.Item>
                <ListGroup.Item>Группа: {group.name}</ListGroup.Item>
                <ListGroup.Item>Телефон: {user.getUser.tel}</ListGroup.Item>
            </ListGroup>
            :
            <ListGroup variant="flush">
                <ListGroup.Item>ФИО: {user.getUser.full_name}</ListGroup.Item>
                <ListGroup.Item>Email: {user.getUser.email}</ListGroup.Item>
                <ListGroup.Item>Группа: {group.name}</ListGroup.Item>
                <ListGroup.Item>Телефон: {user.getUser.tel}</ListGroup.Item>
                <ListGroup.Item
                style={{cursor: 'pointer', textDecoration: 'underline', color: '#0c63e4'}}
                onClick={generatePDF}
                >Скачать список публикаций</ListGroup.Item>
            </ListGroup>
        }
    </ListGroup>
  );
};

export default UserInfoBar;
