import React, { useContext } from "react";
import { Context } from "../index";
import ListGroup from "react-bootstrap/ListGroup";

const UserInfoBar = () => {
  const { publication } = useContext(Context);
  const { user } = useContext(Context);

  return (
    <ListGroup variant="flush">
        322
      <ListGroup.Item>{user.getUser.tel}</ListGroup.Item>

      {publication.category.map((cat) => (
        <ListGroup.Item key={cat.id}>{cat.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default UserInfoBar;
