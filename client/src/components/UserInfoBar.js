import React, { useContext } from "react";
import { Context } from "../index";
import ListGroup from "react-bootstrap/ListGroup";

const UserInfoBar = () => {
  const { user } = useContext(Context);

  return (
    <ListGroup variant="flush">
      <ListGroup.Item>ФИО: {user.getUser.full_name}</ListGroup.Item>
      <ListGroup.Item>Email: {user.getUser.email}</ListGroup.Item>
      <ListGroup.Item>Группа: {user.getUser.groupId}</ListGroup.Item>
      <ListGroup.Item>Телефон: {user.getUser.tel}</ListGroup.Item>
    </ListGroup>
  );
};

export default UserInfoBar;
