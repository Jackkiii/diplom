import React, {useContext, useEffect, useState} from "react";
import { Context } from "../index";
import ListGroup from "react-bootstrap/ListGroup";
import {fetchOneGroup} from "../http/publicationAPI";

const UserInfoBar = () => {
    const {user} = useContext(Context);

    const [group, setGroup] = useState({group: []})
    useEffect(() => {
        fetchOneGroup(user.getUser.groupId).then(data => setGroup(data))
    }, [])

  return (
    <ListGroup variant="flush">
      <ListGroup.Item>ФИО: {user.getUser.full_name}</ListGroup.Item>
      <ListGroup.Item>Email: {user.getUser.email}</ListGroup.Item>
      <ListGroup.Item>Группа: {group.name}</ListGroup.Item>
      <ListGroup.Item>Телефон: {user.getUser.tel}</ListGroup.Item>
    </ListGroup>
  );
};

export default UserInfoBar;
