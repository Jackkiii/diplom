import React, {useContext, useEffect, useState} from "react";
import { Context } from "../index";
import ListGroup from "react-bootstrap/ListGroup";
import {fetchOneGroup} from "../http/userAPI";
import {saveAs} from "file-saver"
import axios from "axios";
import {fetchPublicationListUserId} from "../http/publicationAPI";

const UserInfoBar = () => {
    const {user} = useContext(Context);
    const {publication} = useContext(Context);

    const [group, setGroup] = useState({group: []})
    const [publicationList, setPublicationList] = useState({})

    useEffect(() => {
        fetchOneGroup(user.getUser.groupId).then(data => {
            setGroup(data)
            getPublicationList().then(data => setPublicationList(data))
        })
    }, [])
    //console.log(group.name)

    const getPublicationList = () => fetchPublicationListUserId(user.getUser.id).then(data => ({
        name: user.getUser.full_name,
        group: group.name,
        userId: user.getUser.id,
        list: data,
    }))

    const createAndDownloadPdf = (state) => {
        console.log(state)
        axios.post('http://localhost:5000/create-pdf', state)
            .then(() => axios.get('http://localhost:5000/fetch-pdf', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

                saveAs(pdfBlob, 'newPdf.pdf');
            })
        //console.log(state)
    }

  return (
    <ListGroup variant="flush">
      <ListGroup.Item>ФИО: {user.getUser.full_name}</ListGroup.Item>
      <ListGroup.Item>Email: {user.getUser.email}</ListGroup.Item>
      <ListGroup.Item>Группа: {group.name}</ListGroup.Item>
      <ListGroup.Item>Телефон: {user.getUser.tel}</ListGroup.Item>
      <ListGroup.Item style={{cursor: 'pointer', textDecoration: 'underline'}} onClick={createAndDownloadPdf(publicationList)}
      >Скачать список публикаций</ListGroup.Item>
    </ListGroup>
  );
};

export default UserInfoBar;
